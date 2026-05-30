import { NextResponse } from "next/server";
import {
  isAdminConfigured,
  findCustomerByEmail,
  verifyResetToken,
  clearResetToken,
  updateCustomerPassword,
} from "@/lib/shopifyAdmin";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2024-10";

// Connexion Storefront (email + mot de passe) → { accessToken, customer } ou null
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

// Fallback : ancien lien Shopify (customerResetByUrl). Conservé au cas où un
// email Shopify historique serait encore utilisé.
async function resetViaShopifyUrl(resetUrl, password) {
  const query = `
    mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
      customerResetByUrl(resetUrl: $resetUrl, password: $password) {
        customer { id firstName lastName email }
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }
  `;
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { resetUrl, password } }),
    }
  );
  const { data } = await res.json();
  return data?.customerResetByUrl || null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, token, password, resetUrl } = body;

    if (!password || password.length < 5) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 5 caractères" },
        { status: 400 }
      );
    }

    // --- Mode principal : jeton maison (email + token) ---
    if (email && token) {
      if (!isAdminConfigured()) {
        return NextResponse.json(
          { error: "Configuration serveur incomplète (Admin API)." },
          { status: 500 }
        );
      }

      const customer = await findCustomerByEmail(email);
      if (!customer) {
        return NextResponse.json(
          {
            error:
              "Lien invalide ou expiré. Merci de refaire une demande de mot de passe oublié.",
          },
          { status: 400 }
        );
      }

      const valid = await verifyResetToken(customer.id, token);
      if (!valid) {
        return NextResponse.json(
          {
            error:
              "Ce lien de réinitialisation est invalide ou a expiré. Merci de refaire une demande.",
          },
          { status: 400 }
        );
      }

      const updated = await updateCustomerPassword(customer.id, password);
      if (updated.error) {
        console.error("reset-password: maj mot de passe échouée", updated.error);
        return NextResponse.json(
          { error: "Erreur lors de la mise à jour du mot de passe." },
          { status: 500 }
        );
      }

      // Jeton à usage unique
      await clearResetToken(customer.id);

      // Connexion automatique
      const session = await storefrontLogin(email, password);
      if (!session?.accessToken) {
        return NextResponse.json({ success: true, requiresLogin: true });
      }
      return NextResponse.json({
        success: true,
        accessToken: session.accessToken,
        customer: session.customer,
      });
    }

    // --- Fallback : ancien lien Shopify ---
    if (resetUrl) {
      const result = await resetViaShopifyUrl(resetUrl, password);
      if (!result) {
        return NextResponse.json(
          { error: "Réponse invalide. Merci de refaire une demande." },
          { status: 400 }
        );
      }
      if (result.customerUserErrors?.length > 0) {
        return NextResponse.json(
          {
            error:
              "Ce lien de réinitialisation est invalide ou a expiré. Merci de refaire une demande.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        accessToken: result.customerAccessToken?.accessToken,
        customer: result.customer,
      });
    }

    return NextResponse.json(
      { error: "Lien de réinitialisation manquant ou invalide" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Erreur reset-password:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la réinitialisation" },
      { status: 500 }
    );
  }
}
