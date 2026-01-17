"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export default function Inscription() {
  const router = useRouter();
  const { register, loading, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/compte");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 5) {
      setError("Le mot de passe doit contenir au moins 5 caractères");
      return;
    }

    const result = await register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );

    if (result.success) {
      router.push("/compte");
    } else {
      setError(result.error || "Erreur lors de l'inscription");
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
              Créer un compte
            </h1>
            <p className="text-charcoal/60">
              Rejoignez la communauté Bohemian House
            </p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-3xl shadow-xl shadow-charcoal/5 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Message d'erreur */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Nom et prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal"
                    placeholder="Sandra"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={5}
                    className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
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
                <p className="text-xs text-charcoal/40 mt-1">
                  Minimum 5 caractères
                </p>
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Confirmer le mot de passe *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal"
                  placeholder="••••••••"
                />
              </div>

              {/* Bouton d'inscription */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal text-soft py-4 rounded-xl font-medium hover:bg-warm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création du compte...
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            {/* Séparateur */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-charcoal/10"></div>
              <span className="px-4 text-sm text-charcoal/40">ou</span>
              <div className="flex-1 h-px bg-charcoal/10"></div>
            </div>

            {/* Lien vers connexion */}
            <div className="text-center">
              <p className="text-charcoal/60 mb-4">
                Déjà un compte ?
              </p>
              <Link
                href="/connexion"
                className="inline-block w-full border-2 border-charcoal/20 text-charcoal py-3 rounded-xl font-medium hover:border-charcoal/40 hover:bg-soft/50 transition-all text-center"
              >
                Se connecter
              </Link>
            </div>
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
