// Envoi d'emails liés au mot de passe (réinitialisation / définition de compte),
// réutilisé par /api/auth/forgot-password et /api/auth/register.
//
// ⚠️ Module serveur uniquement (utilise le token Admin + Resend).

import { Resend } from "resend";
import {
  isAdminConfigured,
  findCustomerByEmail,
  generateResetToken,
  storeResetToken,
} from "./shopifyAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Bohemian House <onboarding@resend.dev>";

// Base URL du site pour construire le lien.
export function getSiteUrl(request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const host = request.headers.get("host");
  if (host) return `https://${host}`;
  return "https://bohemianhouse.fr";
}

function buildEmailHtml(link, mode) {
  const isClaim = mode === "claim";
  const title = isClaim
    ? "Activez votre compte"
    : "Réinitialisation de votre mot de passe";
  const intro = isClaim
    ? "Une adresse identique à la vôtre est déjà connue chez nous (par exemple suite à une commande). Pour créer l'accès à votre compte en toute sécurité, cliquez sur le bouton ci-dessous pour définir votre mot de passe."
    : "Vous avez demandé à réinitialiser le mot de passe de votre compte Bohemian House. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.";
  const button = isClaim ? "Définir mon mot de passe" : "Réinitialiser mon mot de passe";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f6f1; padding: 32px;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h1 style="color: #2d2a26; font-size: 24px; margin: 0 0 8px 0; border-bottom: 2px solid #c9a876; padding-bottom: 12px;">
          ${title}
        </h1>
        <p style="color: #6b6b6b; font-size: 14px; margin: 16px 0;">Bonjour,</p>
        <p style="color: #2d2a26; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
          ${intro} Ce lien est valable pendant 1 heure.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${link}" style="display: inline-block; background-color: #2d2a26; color: #f9f6f1; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-weight: 600; font-size: 15px;">
            ${button}
          </a>
        </div>
        <p style="color: #9a9a9a; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0;">
          Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email : aucun changement ne sera effectué.
        </p>
        <p style="color: #9a9a9a; font-size: 12px; margin-top: 32px; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
          Bohemian House — Artisanat de Bali
        </p>
      </div>
    </div>
  `;
}

// Génère un jeton, le stocke côté client Shopify, et envoie l'email.
// mode: "reset" (mot de passe oublié) ou "claim" (email déjà utilisé à l'inscription).
// Retourne { ok, reason? }.
export async function sendPasswordEmail({ email, request, mode = "reset" }) {
  if (!isAdminConfigured()) return { ok: false, reason: "admin" };

  const customer = await findCustomerByEmail(email);
  if (!customer) return { ok: false, reason: "not_found" };

  const rawToken = generateResetToken();
  const stored = await storeResetToken(customer.id, rawToken);
  if (!stored) return { ok: false, reason: "store" };

  const link = `${getSiteUrl(request)}/reinitialiser-mot-de-passe?token=${rawToken}&email=${encodeURIComponent(
    email
  )}`;

  const subject =
    mode === "claim"
      ? "Activez votre compte - Bohemian House"
      : "Réinitialisation de votre mot de passe - Bohemian House";

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject,
    html: buildEmailHtml(link, mode),
  });

  if (error) {
    console.error("sendPasswordEmail: erreur Resend", error);
    return { ok: false, reason: "mail" };
  }

  console.log(
    `sendPasswordEmail: email '${mode}' envoyé à ${email} (id Resend: ${data?.id})`
  );
  return { ok: true };
}
