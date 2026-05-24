import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2024-10";

/**
 * POST /api/auth/reset-password
 *
 * Réinitialise le mot de passe d'un client à partir de l'URL de reset générée
 * par Shopify (celle qu'on reçoit dans l'email de "mot de passe oublié").
 *
 * Deux modes pris en charge :
 *   - Mode "URL complète" : on passe { resetUrl, password }
 *     → utilise la mutation customerResetByUrl(resetUrl, password)
 *
 *   - Mode "token + id" : on passe { customerId, resetToken, password }
 *     → utilise la mutation customerReset(id, input)
 *
 * Le premier mode est le plus simple : on prend directement le lien Shopify
 * et on laisse l'API gérer l'extraction du token.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { resetUrl, customerId, resetToken, password } = body;

    if (!password || password.length < 5) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 5 caractères" },
        { status: 400 }
      );
    }

    let query, variables, resultKey;

    if (resetUrl) {
      // Mode URL complète : la mutation extrait token + id automatiquement
      query = `
        mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
          customerResetByUrl(resetUrl: $resetUrl, password: $password) {
            customer {
              id
              firstName
              lastName
              email
            }
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
      variables = { resetUrl, password };
      resultKey = "customerResetByUrl";
    } else if (customerId && resetToken) {
      // Mode token + id (fallback si on a parsé l'URL en amont)
      query = `
        mutation customerReset($id: ID!, $input: CustomerResetInput!) {
          customerReset(id: $id, input: $input) {
            customer {
              id
              firstName
              lastName
              email
            }
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
      variables = {
        id: customerId,
        input: { resetToken, password },
      };
      resultKey = "customerReset";
    } else {
      return NextResponse.json(
        { error: "Lien de réinitialisation manquant ou invalide" },
        { status: 400 }
      );
    }

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
      console.error("Erreurs GraphQL reset-password:", errors);
      return NextResponse.json(
        { error: "Erreur lors de la réinitialisation du mot de passe" },
        { status: 500 }
      );
    }

    const result = data?.[resultKey];
    if (!result) {
      return NextResponse.json(
        { error: "Réponse Shopify invalide" },
        { status: 500 }
      );
    }

    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      const err = result.customerUserErrors[0];
      // Messages d'erreur plus parlants en français
      const code = err.code || "";
      let message = err.message || "Erreur lors de la réinitialisation";

      if (code === "TOKEN_INVALID" || /token/i.test(message)) {
        message =
          "Ce lien de réinitialisation est invalide ou a expiré. Merci de refaire une demande de mot de passe oublié.";
      } else if (code === "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE") {
        message = "Le mot de passe ne peut pas commencer ou finir par un espace.";
      } else if (/password.*too.*short|too short/i.test(message)) {
        message = "Mot de passe trop court (minimum 5 caractères).";
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    const accessToken = result.customerAccessToken?.accessToken;
    return NextResponse.json({
      success: true,
      accessToken,
      customer: result.customer,
    });
  } catch (error) {
    console.error("Erreur reset-password:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la réinitialisation" },
      { status: 500 }
    );
  }
}
