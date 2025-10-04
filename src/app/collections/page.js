"use client";

import Link from "next/link";
import Navigation from "../components/Navigation";
import CollectionProductGrid from "../components/CollectionProductGrid";
import CategoryPreview from "../components/CategoryPreview";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { categories } from "@/lib/categories";

export default function Collections() {
  return (
    <div className="min-h-screen bg-soft">
      <Navigation />
      <main>
        {/* Hero Section Collections */}
        <section className="relative py-20 bg-gradient-to-br from-creamy to-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Nos Articles
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Choisissez le type d&apos;article qui vous intéresse pour
              découvrir nos créations balinaises authentiques.
            </p>
          </div>
        </section>

        {/* Cartes filtres rapides */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4 tracking-wide">
                Navigation Rapide
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                Cliquez directement sur une catégorie pour découvrir nos
                articles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-warm/20 to-creamy/30 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 bg-charcoal rounded-full flex items-center justify-center group-hover:bg-rustic transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-soft"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {/* Icône différente selon la catégorie */}
                        {category.id === "luminaires" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        )}
                        {category.id === "arts-table" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        )}
                        {category.id === "decoration-murale" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        )}
                        {category.id === "boites-offrandes" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3"
                          />
                        )}
                        {category.id === "petites-decorations" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        )}
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal text-center group-hover:text-rustic transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>

                  {/* Effet de survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rustic/10 to-warm/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Aperçus par catégories */}
        <section className="py-20 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4 tracking-wide">
                Découvrez nos Collections
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                Chaque catégorie reflète un aspect unique de l&apos;artisanat
                balinais traditionnel. Explorez nos sélections d&apos;articles
                authentiques.
              </p>
            </div>

            {/* Aperçu de chaque catégorie */}
            <div className="space-y-16">
              {categories.map((category) => (
                <CategoryPreview key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Section informative */}
        <section className="py-20 bg-gradient-to-r from-warm to-creamy">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
                  L&apos;Art Balinais Traditionnel
                </h2>
                <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">
                  Chaque meuble de notre collection est créé par des artisans
                  balinais selon des techniques ancestrales transmises de
                  génération en génération.
                </p>
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  Nous travaillons directement avec des ateliers locaux à Bali
                  pour vous offrir des pièces authentiques qui allient beauté,
                  fonctionnalité et spiritualité.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">
                      Matériaux nobles et durables
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">
                      Techniques artisanales traditionnelles
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">
                      Commerce équitable avec les artisans
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">
                      Pièces uniques et limitées
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-warm rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-charcoal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                      Fait avec Passion
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      Chaque pièce est créée avec amour et respect des
                      traditions balinaises, pour apporter harmonie et sérénité
                      dans votre foyer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
