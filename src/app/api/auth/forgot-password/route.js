import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  isAdminConfigured,
  findCustomerByEmail,
  generateResetToken,
  storeResetToken,
} from "@/lib/shopifyAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Bohemian House <onboarding@resend.dev>";

// Base URL du site pour construire le lien de réinitialisation.
function getSiteUrl(request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const host = request.headers.get("host");
  if (host) return `https://${host}`;
  return "https://bohemianhouse.fr";
}

function buildEmailHtml(resetLink) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f6f1; padding: 32px;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h1 style="color: #2d2a26; font-size: 24px; margin: 0 0 8px 0; border-bottom: 2px solid #c9a876; padding-bottom: 12px;">
          Réinitialisation de votre mot de passe
        </h1>
        <p style="color: #6b6b6b; font-size: 14px; margin: 16px 0;">
          Bonjour,
        </p>
        <p style="color: #2d2a26; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
          Vous avez demandé à réinitialiser le mot de passe de votre compte Bohemian House.
          Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.
          Ce lien est valable pendant 1 heure.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" style="display: inline-block; background-color: #2d2a26; color: #f9f6f1; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-weight: 600; font-size: 15px;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color: #9a9a9a; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0;">
          Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email :
          votre mot de passe restera inchangé.
        </p>
        <p style="color: #9a9a9a; font-size: 12px; margin-top: 32px; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
          Bohemian House — Artisanat de Bali
        </p>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // Réponse générique systématique pour ne pas révéler si l'email existe.
    const genericResponse = NextResponse.json({
      success: true,
      message:
        "Si un compte existe avec cette adresse, un email de réinitialisation vient d'être envoyé.",
    });

    if (!isAdminConfigured()) {
      console.error("forgot-password: Admin API non configurée");
      return genericResponse;
    }

    const customer = await findCustomerByEmail(email);
    if (!customer) {
      // On renvoie quand même un succès générique (anti-énumération).
      return genericResponse;
    }

    const rawToken = generateResetToken();
    const stored = await storeResetToken(customer.id, rawToken);

    if (!stored) {
      console.error("forgot-password: échec stockage du jeton");
      return genericResponse;
    }

    const siteUrl = getSiteUrl(request);
    const resetLink = `${siteUrl}/reinitialiser-mot-de-passe?token=${rawToken}&email=${encodeURIComponent(
      email
    )}`;

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: "Réinitialisation de votre mot de passe - Bohemian House",
        html: buildEmailHtml(resetLink),
      });
    } catch (mailErr) {
      console.error("forgot-password: erreur envoi Resend", mailErr);
      // On reste générique pour l'utilisateur.
    }

    return genericResponse;
  } catch (error) {
    console.error("Erreur forgot-password:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
