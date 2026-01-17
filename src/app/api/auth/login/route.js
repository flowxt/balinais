import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Créer un token d'accès client via l'API Storefront
    const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email,
        password,
      },
    };

    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Erreurs GraphQL:", errors);
      return NextResponse.json(
        { error: "Erreur lors de la connexion" },
        { status: 500 }
      );
    }

    const { customerAccessTokenCreate } = data;

    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      const errorMessage = customerAccessTokenCreate.customerUserErrors[0].message;
      return NextResponse.json(
        { error: errorMessage || "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    const accessToken = customerAccessTokenCreate.customerAccessToken.accessToken;

    // Récupérer les informations du client
    const customerQuery = `
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

    return NextResponse.json({
      accessToken,
      customer: customerData.data.customer,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la connexion" },
      { status: 500 }
    );
  }
}
