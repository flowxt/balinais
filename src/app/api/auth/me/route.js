import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const accessToken = authHeader?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token manquant" },
        { status: 401 }
      );
    }

    // Récupérer les informations du client
    const query = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
          phone
          createdAt
          orders(first: 20) {
            edges {
              node {
                id
                orderNumber
                totalPrice {
                  amount
                  currencyCode
                }
                processedAt
                fulfillmentStatus
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
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
      `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { customerAccessToken: accessToken },
        }),
      }
    );

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Erreurs GraphQL:", errors);
      return NextResponse.json(
        { error: "Erreur lors de la récupération du profil" },
        { status: 500 }
      );
    }

    if (!data.customer) {
      return NextResponse.json(
        { error: "Session expirée" },
        { status: 401 }
      );
    }

    return NextResponse.json({ customer: data.customer });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
