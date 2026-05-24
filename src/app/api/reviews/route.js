import { NextResponse } from "next/server";

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN;
const PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN;

// Cache mémoire serveur pour éviter de spammer Judge.me et déclencher du 429.
// - fresh : retourne immédiatement la valeur en cache si encore valide
// - stale : si l'API échoue (429, timeout...), on retourne une valeur périmée
//   plutôt que des données vides — meilleure expérience utilisateur.
const CACHE_FRESH_MS = 5 * 60 * 1000;      // 5 min
const CACHE_STALE_MS = 24 * 60 * 60 * 1000; // 24 h
const reviewsCache = new Map(); // cacheKey -> { data, fetchedAt }

function buildPayload(reviews) {
  const rating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;
  return {
    reviews,
    rating: Math.round(rating * 10) / 10,
    count: reviews.length,
  };
}

// Fetche les avis depuis Judge.me.
// Si numericId est fourni → filtre par produit.
// Si null → récupère tous les avis de la boutique (100 premiers).
async function fetchFromJudgeMe(numericId) {
  const params = new URLSearchParams({
    api_token: PRIVATE_TOKEN,
    shop_domain: SHOP_DOMAIN,
    per_page: "100",
  });
  if (numericId) params.set("external_id", numericId);

  const response = await fetch(
    `https://judge.me/api/v1/reviews?${params.toString()}`,
    { headers: { "Content-Type": "application/json" } }
  );
  return response;
}

// GET - Récupérer les avis
// ?productId=gid://shopify/Product/123  → avis de ce produit uniquement
// ?all=1                                → tous les avis de la boutique
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const fetchAll = searchParams.get("all") === "1";

    if (!productId && !fetchAll) {
      return NextResponse.json({ reviews: [], rating: 0, count: 0 });
    }

    const numericId = productId
      ? productId.replace("gid://shopify/Product/", "")
      : null;
    const cacheKey = numericId ?? "__all__";
    const now = Date.now();
    const cached = reviewsCache.get(cacheKey);

    // Cache frais → on renvoie sans appeler Judge.me
    if (cached && now - cached.fetchedAt < CACHE_FRESH_MS) {
      return NextResponse.json(cached.data, { headers: { "X-Cache": "HIT" } });
    }

    let response;
    try {
      response = await fetchFromJudgeMe(numericId);
    } catch (fetchErr) {
      if (cached && now - cached.fetchedAt < CACHE_STALE_MS) {
        return NextResponse.json(cached.data, {
          headers: { "X-Cache": "STALE-NETWORK-ERROR" },
        });
      }
      return NextResponse.json({ reviews: [], rating: 0, count: 0 });
    }

    if (!response.ok) {
      if (cached && now - cached.fetchedAt < CACHE_STALE_MS) {
        return NextResponse.json(cached.data, {
          headers: { "X-Cache": `STALE-${response.status}` },
        });
      }
      console.error("Judge.me API error:", response.status);
      return NextResponse.json({ reviews: [], rating: 0, count: 0 });
    }

    const data = await response.json();
    let reviews = data.reviews || [];

    // Si on filtre par produit, on vérifie l'external_id strict
    if (numericId) {
      reviews = reviews.filter((review) => {
        const candidates = [
          review.product_external_id,
          review.external_id,
          review.reviewable_id,
          review.reviewable?.id,
        ];
        return candidates.some(
          (c) => c != null && String(c) === String(numericId)
        );
      });
    }

    const payload = buildPayload(reviews);
    reviewsCache.set(cacheKey, { data: payload, fetchedAt: now });

    return NextResponse.json(payload, { headers: { "X-Cache": "MISS" } });
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

    // Invalider le cache du produit pour que le nouvel avis apparaisse rapidement
    reviewsCache.delete(numericId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'avis:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
