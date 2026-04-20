import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@bohemianhouse.fr";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Bohemian House <onboarding@resend.dev>";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const subjectLabels = {
      information: "Demande d'information",
      devis: "Demande de devis",
      rdv: "Prise de rendez-vous",
      commande: "Suivi de commande",
      autre: "Autre",
    };

    const subjectLabel = subjectLabels[subject] || subject;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f6f1; padding: 32px;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <h1 style="color: #2d2a26; font-size: 24px; margin: 0 0 8px 0; border-bottom: 2px solid #c9a876; padding-bottom: 12px;">
            Nouveau message - Bohemian House
          </h1>
          <p style="color: #6b6b6b; font-size: 14px; margin: 0 0 24px 0;">
            Message reçu via le formulaire de contact
          </p>

          <h2 style="color: #2d2a26; font-size: 16px; margin: 24px 0 12px 0;">Informations du contact</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b; width: 130px;"><strong>Nom :</strong></td>
              <td style="padding: 8px 0; color: #2d2a26;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;"><strong>Email :</strong></td>
              <td style="padding: 8px 0; color: #2d2a26;"><a href="mailto:${email}" style="color: #c9a876;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;"><strong>Téléphone :</strong></td>
              <td style="padding: 8px 0; color: #2d2a26;"><a href="tel:${phone}" style="color: #c9a876;">${phone}</a></td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 8px 0; color: #6b6b6b;"><strong>Sujet :</strong></td>
              <td style="padding: 8px 0; color: #2d2a26;">${subjectLabel}</td>
            </tr>
          </table>

          <h2 style="color: #2d2a26; font-size: 16px; margin: 24px 0 12px 0;">Message</h2>
          <div style="background-color: #f9f6f1; border-radius: 8px; padding: 16px; color: #2d2a26; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

          <p style="color: #9a9a9a; font-size: 12px; margin-top: 32px; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
            Email automatique - Bohemian House
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Bohemian House] ${subjectLabel} - ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Erreur formulaire contact:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
