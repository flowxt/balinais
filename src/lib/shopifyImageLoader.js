// Loader d'images pour les photos hébergées sur Shopify (cdn.shopify.com).
// Le CDN de Shopify redimensionne lui-même les images via le paramètre ?width=,
// ce qui évite de passer par l'optimiseur d'images de Vercel (/_next/image),
// limité en quota sur le plan gratuit (erreur 402 une fois le quota dépassé).
export default function shopifyImageLoader({ src, width }) {
  try {
    const url = new URL(src);
    if (url.hostname !== "cdn.shopify.com") return src;
    url.searchParams.set("width", String(width));
    return url.toString();
  } catch {
    return src;
  }
}
