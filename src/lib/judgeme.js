// Judge.me API helpers

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN;
const PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN;

// Récupérer les avis d'un produit
export async function getProductReviews(productId, page = 1, perPage = 10) {
  try {
    // Extraire l'ID numérique du produit Shopify
    const numericId = productId.replace("gid://shopify/Product/", "");
    
    const response = await fetch(
      `https://judge.me/api/v1/reviews?` +
      `api_token=${PUBLIC_TOKEN}&` +
      `shop_domain=${SHOP_DOMAIN}&` +
      `external_id=${numericId}&` +
      `page=${page}&` +
      `per_page=${perPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Cache pendant 60 secondes
      }
    );

    if (!response.ok) {
      console.error("Erreur Judge.me:", response.status);
      return { reviews: [], rating: 0, count: 0 };
    }

    const data = await response.json();
    
    return {
      reviews: data.reviews || [],
      rating: data.reviews?.length > 0 
        ? data.reviews.reduce((acc, r) => acc + r.rating, 0) / data.reviews.length 
        : 0,
      count: data.reviews?.length || 0,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return { reviews: [], rating: 0, count: 0 };
  }
}

// Récupérer la note moyenne d'un produit (plus léger)
export async function getProductRating(productId) {
  try {
    const numericId = productId.replace("gid://shopify/Product/", "");
    
    const response = await fetch(
      `https://judge.me/api/v1/reviews?` +
      `api_token=${PUBLIC_TOKEN}&` +
      `shop_domain=${SHOP_DOMAIN}&` +
      `external_id=${numericId}&` +
      `per_page=100`,
      {
        next: { revalidate: 300 }, // Cache pendant 5 minutes
      }
    );

    if (!response.ok) {
      return { rating: 0, count: 0 };
    }

    const data = await response.json();
    const reviews = data.reviews || [];
    
    if (reviews.length === 0) {
      return { rating: 0, count: 0 };
    }

    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    return {
      rating: Math.round(averageRating * 10) / 10,
      count: reviews.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la note:", error);
    return { rating: 0, count: 0 };
  }
}

// Soumettre un avis (côté serveur uniquement)
export async function submitReview(reviewData) {
  try {
    const response = await fetch("https://judge.me/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_token: PRIVATE_TOKEN,
        shop_domain: SHOP_DOMAIN,
        platform: "shopify",
        ...reviewData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de l'envoi de l'avis");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'avis:", error);
    throw error;
  }
}
