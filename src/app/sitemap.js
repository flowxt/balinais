import { getAllProducts } from "@/lib/shopify";
import { categories } from "@/lib/categories";
import { extractProductId } from "@/lib/utils";

const BASE_URL = "https://bohemianhouse.fr";

// Régénère le sitemap au maximum une fois par heure (ISR).
export const revalidate = 3600;

// Génère automatiquement /sitemap.xml
export default async function sitemap() {
  const now = new Date();

  // Pages statiques publiques
  const staticRoutes = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/collections", changeFrequency: "daily", priority: 0.9 },
    { path: "/a-propos", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/cgv", changeFrequency: "yearly", priority: 0.3 },
    { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
  ].map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Pages catégories
  const categoryRoutes = categories.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Pages produits (récupérées dynamiquement depuis Shopify)
  let productRoutes = [];
  try {
    const products = await getAllProducts();
    productRoutes = (products || []).map((p) => ({
      url: `${BASE_URL}/produit/${extractProductId(p.id)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("sitemap: échec récupération produits", error);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
