import { NextResponse } from "next/server";
import {
  isAdminConfigured,
  createCustomerWithPassword,
} from "@/lib/shopifyAdmin";
import { sendPasswordEmail } from "@/lib/passwordReset";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2024-10";

// Connecte le client via la Storefront API (email + mot de passe) et récupère
// son profil. Retourne { accessToken, customer } ou null si échec.
async function storefrontLogin(email, password) {
  const loginQuery = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }
  `;

  const loginRes = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: loginQuery,
        variables: { input: { email, password } },
      }),
    }
  );

  const loginData = await loginRes.json();
  const accessToken =
    loginData?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
  if (!accessToken) return null;

  const customerQuery = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id firstName lastName email phone createdAt
      }
    }
  `;

  const customerRes = await fetch(
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

  const customerData = await customerRes.json();
  return { accessToken, customer: customerData?.data?.customer || null };
}

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

    if (!isAdminConfigured()) {
      return NextResponse.json(
        {
          error:
            "Configuration serveur incomplète (Admin API). Merci de contacter le support.",
        },
        { status: 500 }
      );
    }

    // 1. Création du compte via l'Admin API → compte ACTIF, sans email d'activation.
    const created = await createCustomerWithPassword({
      firstName,
      lastName,
      email,
      password,
    });

    if (created.error === "EMAIL_TAKEN") {
      // L'email existe déjà (souvent un client ayant commandé en tant qu'invité,
      // ou un compte déjà créé). Pour des raisons de sécurité, on ne crée pas
      // l'accès directement : on envoie un email permettant de DÉFINIR le mot de
      // passe (ce qui prouve qu'il est bien propriétaire de l'adresse).
      const sent = await sendPasswordEmail({ email, request, mode: "claim" });

      return NextResponse.json(
        {
          accountExists: true,
          emailSent: sent.ok,
          message: sent.ok
            ? "Un compte existe déjà avec cette adresse. Nous venons de vous envoyer un email pour définir votre mot de passe et accéder à votre compte."
            : "Un compte existe déjà avec cette adresse. Utilisez « Mot de passe oublié » pour définir votre mot de passe.",
        },
        { status: 409 }
      );
    }

    if (created.error) {
      console.error("Admin createCustomer error:", created.error);
      return NextResponse.json(
        { error: "Erreur lors de la création du compte. Merci de réessayer." },
        { status: 500 }
      );
    }

    // 2. Connexion automatique via la Storefront API.
    const session = await storefrontLogin(email, password);

    if (!session?.accessToken) {
      // Le compte est bien créé ; seul l'auto-login a échoué.
      return NextResponse.json({
        success: true,
        requiresLogin: true,
        message: "Compte créé avec succès. Vous pouvez maintenant vous connecter.",
      });
    }

    return NextResponse.json({
      accessToken: session.accessToken,
      customer: session.customer,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
