// Fonction pour extraire l'ID numérique d'un ID Shopify
export function extractProductId(shopifyId) {
  if (typeof shopifyId === 'string') {
    // Si c'est déjà un ID Shopify complet, on extrait juste la partie numérique
    const match = shopifyId.match(/(\d+)$/);
    return match ? match[1] : shopifyId;
  }
  return shopifyId;
}

// Fonction pour formater le prix
export function formatPrice(amount, currencyCode = 'EUR') {
  const price = parseFloat(amount);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

// Fonction pour créer un slug à partir du titre
export function createSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[^a-z0-9\s-]/g, '') // Enlever les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Enlever les tirets multiples
    .trim('-'); // Enlever les tirets en début/fin
}
