import Client from 'shopify-buy';

// Configuration du client Shopify
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Fonction pour récupérer tous les produits
export async function getAllProducts() {
  try {
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return [];
  }
}

// Fonction pour récupérer un produit par ID
export async function getProduct(productId) {
  try {
    const product = await client.product.fetch(productId);
    return product;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return null;
  }
}

// Fonction pour créer un checkout (panier)
export async function createCheckout() {
  try {
    const checkout = await client.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Erreur lors de la création du checkout:', error);
    return null;
  }
}

// Fonction pour ajouter des articles au checkout
export async function addToCheckout(checkoutId, lineItemsToAdd) {
  try {
    const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    return checkout;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    return null;
  }
}

export default client;
