import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    // Envoyer l'email de récupération via l'API Storefront
    const query = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            code
            field
            message
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
        body: JSON.stringify({ query, variables: { email } }),
      }
    );

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Erreurs GraphQL:", errors);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Note: Shopify ne retourne pas d'erreur si l'email n'existe pas (pour des raisons de sécurité)
    // On retourne toujours un succès pour ne pas révéler si l'email existe ou non
    
    return NextResponse.json({ 
      success: true,
      message: "Si un compte existe avec cette adresse, un email de récupération a été envoyé."
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du mot de passe:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
