"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";
import { useAuth } from "@/contexts/AuthContext";

function ReinitialiserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Notre lien maison (envoyé par Resend) est du type :
  //   https://bohemianhouse.fr/reinitialiser-mot-de-passe?token=...&email=...
  // On conserve aussi le fallback "ancien lien Shopify" (?url=...).
  const { resetUrl, email, token, isReady } = useMemo(() => {
    const url = searchParams.get("url") || searchParams.get("resetUrl");
    const mail = searchParams.get("email");
    const tok = searchParams.get("token") || searchParams.get("resetToken");

    return {
      resetUrl: url || null,
      email: mail || null,
      token: tok || null,
      isReady: Boolean((mail && tok) || url),
    };
  }, [searchParams]);

  // Validation simple côté client
  const isPasswordValid = password.length >= 5;
  const doPasswordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Le mot de passe doit contenir au moins 5 caractères.");
      return;
    }
    if (!doPasswordsMatch) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    if (!isReady) {
      setError(
        "Lien de réinitialisation invalide. Merci de redemander un email depuis 'Mot de passe oublié'."
      );
      return;
    }

    setLoading(true);
    try {
      const payload = resetUrl
        ? { resetUrl, password }
        : { email, token, password };

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de la réinitialisation");
        return;
      }

      // On stocke le token directement pour reconnecter automatiquement
      if (data.accessToken) {
        localStorage.setItem("customerAccessToken", data.accessToken);
        await checkAuth();
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(data.accessToken ? "/compte" : "/connexion");
      }, 2500);
    } catch (err) {
      setError("Erreur réseau, merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <Cart />

      <main className="min-h-screen bg-gradient-to-br from-creamy via-warm/40 to-creamy py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-md mx-auto px-4 relative">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Nouveau mot de passe
            </h1>
            <p className="text-charcoal/75">
              Choisissez un nouveau mot de passe pour votre compte
            </p>
          </div>

          <div className="bg-gradient-to-br from-soft to-creamy/40 rounded-3xl shadow-2xl shadow-charcoal/15 p-8 md:p-10 border border-warm/40">
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-xl text-charcoal mb-3">
                  Mot de passe mis à jour
                </h2>
                <p className="text-charcoal/65 mb-6">
                  Vous allez être redirigé...
                </p>
              </div>
            ) : !isReady ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-xl text-charcoal mb-3">
                  Lien invalide
                </h2>
                <p className="text-charcoal/70 mb-8">
                  Ce lien de réinitialisation est invalide ou incomplet.
                  Merci de redemander un email de réinitialisation.
                </p>
                <Link
                  href="/mot-de-passe-oublie"
                  className="inline-block bg-charcoal text-soft px-6 py-3 rounded-xl font-medium hover:bg-warm transition-colors"
                >
                  Mot de passe oublié
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={5}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pr-12 border border-charcoal/15 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-creamy/20 text-charcoal placeholder:text-charcoal/40"
                      placeholder="Au moins 5 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {password && !isPasswordValid && (
                    <p className="mt-1.5 text-xs text-amber-700">
                      Minimum 5 caractères
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Confirmer le mot de passe
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-charcoal/15 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-creamy/20 text-charcoal placeholder:text-charcoal/40"
                    placeholder="Retapez votre mot de passe"
                  />
                  {confirmPassword && !doPasswordsMatch && (
                    <p className="mt-1.5 text-xs text-amber-700">
                      Les mots de passe ne correspondent pas
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !isPasswordValid || !doPasswordsMatch}
                  className="w-full bg-charcoal text-soft py-4 rounded-xl font-medium hover:bg-warm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mise à jour...
                    </>
                  ) : (
                    "Réinitialiser mon mot de passe"
                  )}
                </button>
              </form>
            )}
          </div>

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

export default function ReinitialiserMotDePassePage() {
  return (
    <Suspense fallback={null}>
      <ReinitialiserContent />
    </Suspense>
  );
}
