import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2024-10";

// Traduit les codes/messages Shopify en messages clairs pour l'utilisateur.
function translateError(userError) {
  const code = userError?.code || "";
  const raw = userError?.message || "";

  // Code générique quand l'email/mdp est invalide (cas normal)
  if (code === "UNIDENTIFIED_CUSTOMER" || /unidentified/i.test(raw)) {
    return "Email ou mot de passe incorrect.";
  }

  // Le compte n'a pas encore activé son mot de passe (importation depuis Shopify)
  // ou le marchand est passé en "New customer accounts" → on guide vers reset
  if (code === "CUSTOMER_DISABLED" || /disabled|not.*activated/i.test(raw)) {
    return (
      "Votre compte n'a pas encore de mot de passe activé. " +
      "Merci d'utiliser \"Mot de passe oublié\" pour en créer un."
    );
  }

  if (code === "TOO_MANY_ATTEMPTS" || /too many/i.test(raw)) {
    return "Trop de tentatives. Merci de patienter quelques minutes avant de réessayer.";
  }

  return raw || "Email ou mot de passe incorrect.";
}

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
      `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
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
        { error: "Erreur lors de la connexion. Merci de réessayer." },
        { status: 500 }
      );
    }

    const { customerAccessTokenCreate } = data;

    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      const userError = customerAccessTokenCreate.customerUserErrors[0];
      return NextResponse.json(
        { error: translateError(userError) },
        { status: 401 }
      );
    }

    const accessToken = customerAccessTokenCreate.customerAccessToken?.accessToken;

    // Garde-fou : si Shopify a forcé le mode "New customer accounts", le token créé
    // peut être incompatible avec la query customer() classique → on prévient explicitement.
    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Connexion impossible avec ce compte. Si vous avez déjà commandé chez nous, utilisez \"Mot de passe oublié\" pour activer votre mot de passe.",
        },
        { status: 401 }
      );
    }

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
      `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
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

    // Si le token est valide pour login mais pas pour récupérer le customer,
    // c'est probablement parce que la boutique est en "New customer accounts"
    // qui ne supporte pas la query customer() de la Storefront API classique.
    if (!customerData?.data?.customer) {
      return NextResponse.json(
        {
          error:
            "Votre compte client est géré par le nouveau système Shopify (vérification par email obligatoire). " +
            "Pour autoriser la connexion directe sur le site, l'administrateur Shopify doit activer \"Classic customer accounts\" dans Settings > Customer accounts.",
        },
        { status: 401 }
      );
    }

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
