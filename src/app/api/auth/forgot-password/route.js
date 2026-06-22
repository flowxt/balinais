import { NextResponse } from "next/server";
import { sendPasswordEmail } from "@/lib/passwordReset";

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

    const result = await sendPasswordEmail({ email, request, mode: "reset" });
    if (!result.ok) {
      // On loggue mais on reste générique côté utilisateur (anti-énumération).
      console.warn(`forgot-password: envoi non effectué (${result.reason}) pour ${email}`);
    }

    return genericResponse;
  } catch (error) {
    console.error("Erreur forgot-password:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
