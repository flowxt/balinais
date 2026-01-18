import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN;
const PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN;

// GET - Récupérer les avis d'un produit
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ reviews: [], rating: 0, count: 0 });
    }

    // Extraire l'ID numérique
    const numericId = productId.replace("gid://shopify/Product/", "");

    // Essayer avec le Private Token (plus de permissions)
    const response = await fetch(
      `https://judge.me/api/v1/reviews?` +
      `api_token=${PRIVATE_TOKEN}&` +
      `shop_domain=${SHOP_DOMAIN}&` +
      `external_id=${numericId}&` +
      `per_page=50`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Si ça ne marche pas, essayer avec handle au lieu de external_id
      const response2 = await fetch(
        `https://judge.me/api/v1/reviews?` +
        `api_token=${PRIVATE_TOKEN}&` +
        `shop_domain=${SHOP_DOMAIN}&` +
        `handle=${numericId}&` +
        `per_page=50`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response2.ok) {
        console.error("Judge.me API error:", response2.status);
        return NextResponse.json({ reviews: [], rating: 0, count: 0 });
      }

      const data2 = await response2.json();
      const reviews2 = data2.reviews || [];
      const rating2 = reviews2.length > 0
        ? reviews2.reduce((acc, r) => acc + r.rating, 0) / reviews2.length
        : 0;

      return NextResponse.json({
        reviews: reviews2,
        rating: Math.round(rating2 * 10) / 10,
        count: reviews2.length,
      });
    }

    const data = await response.json();
    const reviews = data.reviews || [];

    // Calculer la moyenne
    const rating = reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    return NextResponse.json({
      reviews,
      rating: Math.round(rating * 10) / 10,
      count: reviews.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return NextResponse.json({ reviews: [], rating: 0, count: 0 });
  }
}

// POST - Soumettre un nouvel avis
export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, productTitle, name, email, rating, title, body: reviewBody } = body;

    if (!productId || !name || !email || !rating || !reviewBody) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Extraire l'ID numérique
    const numericId = productId.replace("gid://shopify/Product/", "");

    const reviewData = {
      api_token: PRIVATE_TOKEN,
      shop_domain: SHOP_DOMAIN,
      platform: "shopify",
      id: numericId,
      external_id: numericId,
      name: productTitle || "Produit",
      email: email,
      reviewer: {
        name: name,
        email: email,
      },
      rating: rating,
      title: title || "",
      body: reviewBody,
    };

    const response = await fetch("https://judge.me/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Judge.me POST error:", response.status, errorData);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'avis" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'avis:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
