import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (password.length < 5) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 5 caractères" },
        { status: 400 }
      );
    }

    // Créer le client via l'API Storefront
    const createCustomerQuery = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const createVariables = {
      input: {
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        password,
        acceptsMarketing: false,
      },
    };

    const createResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: createCustomerQuery, variables: createVariables }),
      }
    );

    const createData = await createResponse.json();

    if (createData.errors) {
      console.error("Erreurs GraphQL:", createData.errors);
      return NextResponse.json(
        { error: "Erreur lors de la création du compte" },
        { status: 500 }
      );
    }

    const { customerCreate } = createData.data;

    if (customerCreate.customerUserErrors.length > 0) {
      const errorMessage = customerCreate.customerUserErrors[0].message;
      
      // Messages d'erreur plus clairs en français
      if (errorMessage.includes("already exists") || errorMessage.includes("taken")) {
        return NextResponse.json(
          { error: "Cette adresse email est déjà utilisée" },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: errorMessage || "Erreur lors de la création du compte" },
        { status: 400 }
      );
    }

    // Connecter automatiquement le client après l'inscription
    const loginQuery = `
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

    const loginVariables = {
      input: {
        email,
        password,
      },
    };

    const loginResponse = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: loginQuery, variables: loginVariables }),
      }
    );

    const loginData = await loginResponse.json();

    if (loginData.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      // Le compte a été créé mais la connexion a échoué
      return NextResponse.json({
        success: true,
        message: "Compte créé avec succès. Veuillez vous connecter.",
        customer: customerCreate.customer,
      });
    }

    const accessToken = loginData.data.customerAccessTokenCreate.customerAccessToken.accessToken;

    return NextResponse.json({
      accessToken,
      customer: customerCreate.customer,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
