import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// Récupérer l'ID admin du client à partir du token Storefront
async function getCustomerAdminId(accessToken) {
  const customerQuery = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
      }
    }
  `;

  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: customerQuery,
        variables: { customerAccessToken: accessToken },
      }),
    }
  );

  const data = await response.json();
  if (!data.data?.customer?.id) return null;
  
  // Convertir l'ID Storefront en ID Admin
  return data.data.customer.id.replace("gid://shopify/Customer/", "");
}

// GET - Récupérer les favoris d'un client
export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const accessToken = authHeader?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json({ favorites: [] });
    }

    const adminCustomerId = await getCustomerAdminId(accessToken);
    if (!adminCustomerId) {
      return NextResponse.json({ favorites: [] });
    }

    // Récupérer les metafields du client via l'Admin API
    const metafieldsResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/customers/${adminCustomerId}/metafields.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    if (!metafieldsResponse.ok) {
      return NextResponse.json({ favorites: [] });
    }

    const metafieldsData = await metafieldsResponse.json();
    const favoritesMetafield = metafieldsData.metafields?.find(
      (m) => m.namespace === "bohemian" && m.key === "favorites"
    );

    const favorites = favoritesMetafield ? JSON.parse(favoritesMetafield.value) : [];

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris:", error);
    return NextResponse.json({ favorites: [] });
  }
}

// POST - Ajouter un favori
export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const accessToken = authHeader?.replace("Bearer ", "");
    const { productId } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const adminCustomerId = await getCustomerAdminId(accessToken);
    if (!adminCustomerId) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 });
    }

    // Récupérer les favoris actuels
    const metafieldsResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/customers/${adminCustomerId}/metafields.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const metafieldsData = await metafieldsResponse.json();
    const favoritesMetafield = metafieldsData.metafields?.find(
      (m) => m.namespace === "bohemian" && m.key === "favorites"
    );

    let favorites = favoritesMetafield ? JSON.parse(favoritesMetafield.value) : [];

    // Ajouter le nouveau favori s'il n'existe pas déjà
    if (!favorites.includes(productId)) {
      favorites.push(productId);
    }

    // Mettre à jour ou créer le metafield
    const metafieldPayload = {
      metafield: {
        namespace: "bohemian",
        key: "favorites",
        value: JSON.stringify(favorites),
        type: "json",
      },
    };

    await fetch(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/customers/${adminCustomerId}/metafields.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metafieldPayload),
      }
    );

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    console.error("Erreur lors de l'ajout aux favoris:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE - Supprimer un favori
export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const accessToken = authHeader?.replace("Bearer ", "");
    const { productId } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const adminCustomerId = await getCustomerAdminId(accessToken);
    if (!adminCustomerId) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 });
    }

    // Récupérer les favoris actuels
    const metafieldsResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/customers/${adminCustomerId}/metafields.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const metafieldsData = await metafieldsResponse.json();
    const favoritesMetafield = metafieldsData.metafields?.find(
      (m) => m.namespace === "bohemian" && m.key === "favorites"
    );

    let favorites = favoritesMetafield ? JSON.parse(favoritesMetafield.value) : [];

    // Supprimer le favori
    favorites = favorites.filter((id) => id !== productId);

    // Mettre à jour le metafield
    if (favoritesMetafield) {
      await fetch(
        `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/metafields/${favoritesMetafield.id}.json`,
        {
          method: "PUT",
          headers: {
            "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metafield: {
              id: favoritesMetafield.id,
              value: JSON.stringify(favorites),
            },
          }),
        }
      );
    }

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    console.error("Erreur lors de la suppression des favoris:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
