"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <Cart />

      <main className="min-h-screen bg-gradient-to-b from-soft via-creamy/20 to-soft py-16">
        <div className="max-w-md mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Mot de passe oublié
            </h1>
            <p className="text-charcoal/60">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-3xl shadow-xl shadow-charcoal/5 p-8 md:p-10">
            {success ? (
              /* Message de succès */
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-xl text-charcoal mb-4">
                  Email envoyé !
                </h2>
                <p className="text-charcoal/60 mb-6">
                  Si un compte existe avec l&apos;adresse <strong>{email}</strong>, 
                  vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                </p>
                <p className="text-sm text-charcoal/40 mb-8">
                  Pensez à vérifier vos spams si vous ne voyez pas l&apos;email.
                </p>
                <Link
                  href="/connexion"
                  className="inline-block bg-charcoal text-soft px-6 py-3 rounded-xl font-medium hover:bg-warm transition-colors"
                >
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              /* Formulaire */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message d'erreur */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal text-soft py-4 rounded-xl font-medium hover:bg-warm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le lien de réinitialisation"
                  )}
                </button>
              </form>
            )}

            {!success && (
              <>
                {/* Séparateur */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 h-px bg-charcoal/10"></div>
                  <span className="px-4 text-sm text-charcoal/40">ou</span>
                  <div className="flex-1 h-px bg-charcoal/10"></div>
                </div>

                {/* Liens */}
                <div className="text-center space-y-4">
                  <Link
                    href="/connexion"
                    className="block text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    Retour à la connexion
                  </Link>
                  <p className="text-charcoal/40 text-sm">
                    Pas encore de compte ?{" "}
                    <Link href="/inscription" className="text-warm hover:text-charcoal transition-colors">
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Lien retour */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-charcoal/50 hover:text-charcoal transition-colors text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
