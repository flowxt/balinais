import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

// Synchroniser tous les favoris d'un coup
export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const accessToken = authHeader?.replace("Bearer ", "");
    const { favorites } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer l'ID du client
    const customerQuery = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
        }
      }
    `;

    const customerResponse = await fetch(
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

    const customerData = await customerResponse.json();

    if (!customerData.data?.customer) {
      return NextResponse.json({ error: "Client non trouvé" }, { status: 404 });
    }

    const customerId = customerData.data.customer.id;
    const adminCustomerId = customerId.replace("gid://shopify/Customer/", "");

    // Mettre à jour ou créer le metafield avec tous les favoris
    const metafieldPayload = {
      metafield: {
        namespace: "bohemian",
        key: "favorites",
        value: JSON.stringify(favorites || []),
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
    console.error("Erreur lors de la synchronisation des favoris:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
