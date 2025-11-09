// Configuration Shopify
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Client Shopify-buy (importé de manière conditionnelle)
let client = null;

// Fonction pour initialiser le client seulement quand nécessaire
async function getShopifyClient() {
  if (!client && typeof window !== 'undefined') {
    try {
      const Client = (await import("shopify-buy")).default;
      client = Client.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation du client Shopify:", error);
    }
  }
  return client;
}

// Données de test pour le développement
function getMockProducts() {
  return [
    {
      id: "1",
      title: "Lampe en Bambou Traditionnelle",
      description: "Magnifique lampe artisanale en bambou tressé, créée par des artisans balinais.",
      tags: ["luminaires"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Lampe en bambou"
        }
      ],
      variants: [
        {
          id: "v1",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "89.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "2",
      title: "Suspension Rotin Naturel",
      description: "Élégante suspension en rotin naturel pour illuminer vos espaces avec style.",
      tags: ["luminaires"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Suspension rotin"
        }
      ],
      variants: [
        {
          id: "v2",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "125.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "3",
      title: "Bol en Bois de Teck",
      description: "Superbe bol artisanal sculpté dans du bois de teck massif.",
      tags: ["arts-de-la-table"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Bol en teck"
        }
      ],
      variants: [
        {
          id: "v3",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "45.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "4",
      title: "Assiettes Sculptées",
      description: "Set d'assiettes en bois sculpté, parfaites pour une présentation authentique.",
      tags: ["arts-de-la-table"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Assiettes sculptées"
        }
      ],
      variants: [
        {
          id: "v4",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "65.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "5",
      title: "Masque Balinais Traditionnel",
      description: "Authentique masque balinais sculpté à la main par des artisans locaux.",
      tags: ["decoration-murale"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Masque balinais"
        }
      ],
      variants: [
        {
          id: "v5",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "95.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "6",
      title: "Panneau Décoratif Fleurs",
      description: "Panneau mural décoratif avec motifs floraux traditionnels balinais.",
      tags: ["decoration-murale"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Panneau décoratif"
        }
      ],
      variants: [
        {
          id: "v6",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "155.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "7",
      title: "Boîte à Offrandes Sacrée",
      description: "Boîte cérémonielle traditionnelle pour les offrandes spirituelles.",
      tags: ["boites-offrandes"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Boîte offrandes"
        }
      ],
      variants: [
        {
          id: "v7",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "75.00",
            currencyCode: "EUR"
          }
        }
      ]
    },
    {
      id: "8",
      title: "Statuette Ganesh",
      description: "Petite statuette de Ganesh sculptée dans le bois précieux.",
      tags: ["petites-decorations"],
      availableForSale: true,
      images: [
        {
          src: "/images/meuble-hero.png",
          altText: "Statuette Ganesh"
        }
      ],
      variants: [
        {
          id: "v8",
          title: "Default",
          availableForSale: true,
          price: {
            amount: "35.00",
            currencyCode: "EUR"
          }
        }
      ]
    }
  ];
}

// Fonction pour récupérer tous les produits avec les tags
export async function getAllProducts() {
  try {
    // Si les variables d'environnement ne sont pas définies, retourner des données de test
    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
      console.warn("Variables d'environnement Shopify manquantes, utilisation de données de test");
      return getMockProducts();
    }

    // Utiliser une requête GraphQL pour récupérer les tags
    const query = `
      {
        products(first: 50) {
          edges {
            node {
              id
              title
              description
              tags
              availableForSale
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2023-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Erreurs GraphQL:", errors);
      return getMockProducts();
    }

    // Transformer les données pour correspondre au format attendu
    const products = data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      tags: node.tags,
      availableForSale: node.availableForSale,
      images: node.images.edges.map(({ node: imageNode }) => ({
        src: imageNode.url,
        altText: imageNode.altText,
      })),
      variants: node.variants.edges.map(({ node: variantNode }) => ({
        id: variantNode.id,
        title: variantNode.title,
        availableForSale: variantNode.availableForSale,
        price: {
          amount: variantNode.priceV2.amount,
          currencyCode: variantNode.priceV2.currencyCode,
        },
      })),
    }));

    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return getMockProducts();
  }
}

// Fonction pour récupérer un produit par ID
export async function getProduct(productId) {
  try {
    // Si les variables d'environnement ne sont pas définies, retourner des données de test
    if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
      console.warn("Variables d'environnement Shopify manquantes, utilisation de données de test");
      const mockProducts = getMockProducts();
      return mockProducts.find(p => p.id === productId) || null;
    }

    // Utiliser une requête GraphQL pour récupérer le produit avec toutes les variantes et leur stock
    const query = `
      {
        product(id: "${productId}") {
          id
          title
          description
          descriptionHtml
          tags
          availableForSale
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2023-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Erreurs GraphQL:", errors);
      return null;
    }

    if (!data.product) {
      return null;
    }

    const node = data.product;

    // Transformer les données pour correspondre au format attendu
    const product = {
      id: node.id,
      title: node.title,
      description: node.description,
      descriptionHtml: node.descriptionHtml,
      tags: node.tags,
      availableForSale: node.availableForSale,
      images: node.images.edges.map(({ node: imageNode }) => ({
        src: imageNode.url,
        altText: imageNode.altText,
      })),
      variants: node.variants.edges.map(({ node: variantNode }) => ({
        id: variantNode.id,
        title: variantNode.title,
        availableForSale: variantNode.availableForSale,
        quantityAvailable: variantNode.quantityAvailable,
        price: {
          amount: variantNode.priceV2.amount,
          currencyCode: variantNode.priceV2.currencyCode,
        },
      })),
    };

    return product;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return null;
  }
}

// Fonction pour créer un checkout (panier)
export async function createCheckout() {
  try {
    const shopifyClient = await getShopifyClient();
    if (!shopifyClient) {
      console.warn("Client Shopify non disponible");
      return null;
    }
    const checkout = await shopifyClient.checkout.create();
    return checkout;
  } catch (error) {
    console.error("Erreur lors de la création du checkout:", error);
    return null;
  }
}

// Fonction pour ajouter des articles au checkout
export async function addToCheckout(checkoutId, lineItemsToAdd) {
  try {
    const shopifyClient = await getShopifyClient();
    if (!shopifyClient) {
      console.warn("Client Shopify non disponible");
      return null;
    }
    const checkout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    return checkout;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return null;
  }
}

// Fonction pour récupérer le checkout existant
export async function fetchCheckout(checkoutId) {
  try {
    const shopifyClient = await getShopifyClient();
    if (!shopifyClient) {
      console.warn("Client Shopify non disponible");
      return null;
    }
    const checkout = await shopifyClient.checkout.fetch(checkoutId);
    return checkout;
  } catch (error) {
    console.error("Erreur lors de la récupération du checkout:", error);
    return null;
  }
}

// Fonction pour filtrer les produits par catégorie (basé sur les tags)
export async function getProductsByCategory(categoryId) {
  try {
    const allProducts = await getAllProducts();

    // Filtre les produits qui ont le tag correspondant à la catégorie
    const filteredProducts = allProducts.filter(
      (product) =>
        product.tags &&
        product.tags.some(
          (tag) => tag.toLowerCase() === categoryId.toLowerCase()
        )
    );

    return filteredProducts;
  } catch (error) {
    console.error("Erreur lors du filtrage des produits:", error);
    return [];
  }
}

// Fonction pour récupérer un nombre limité de produits par catégorie pour l'aperçu
export async function getProductsPreviewByCategory(categoryId, limit = 4) {
  try {
    const categoryProducts = await getProductsByCategory(categoryId);
    return categoryProducts.slice(0, limit);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'aperçu des produits:", error);
    return [];
  }
}

export default getShopifyClient;
