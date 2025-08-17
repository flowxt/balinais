"use client";

import Navigation from "../components/Navigation";
import CollectionProductGrid from "../components/CollectionProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

export default function Collections() {
  return (
    <div className="min-h-screen bg-soft">
      <Navigation />
      <main>
        {/* Hero Section Collections */}
        <section className="relative py-20 bg-gradient-to-br from-creamy to-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Nos Collections
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'art authentique du mobilier balinais, 
              où chaque pièce raconte une histoire unique et apporte sérénité à votre intérieur.
            </p>
          </div>
        </section>

        {/* Filtres et catégories */}
        <section className="py-12 bg-soft border-b border-creamy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
                  Artisanat Balinais Authentique
                </h2>
                <p className="text-charcoal/70">
                  Pièces uniques sélectionnées avec soin
                </p>
              </div>
              
              {/* Filtres futurs */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-charcoal text-soft rounded-lg font-medium hover:bg-rustic transition-colors duration-300">
                  Tous les produits
                </button>
                <button className="px-4 py-2 border border-charcoal text-charcoal rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300">
                  Mobilier
                </button>
                <button className="px-4 py-2 border border-charcoal text-charcoal rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300">
                  Décoration
                </button>
                <button className="px-4 py-2 border border-charcoal text-charcoal rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300">
                  Spiritualité
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grille de produits */}
        <CollectionProductGrid />

        {/* Section informative */}
        <section className="py-20 bg-gradient-to-r from-warm to-creamy">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
                  L'Art Balinais Traditionnel
                </h2>
                <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">
                  Chaque meuble de notre collection est créé par des artisans balinais 
                  selon des techniques ancestrales transmises de génération en génération.
                </p>
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  Nous travaillons directement avec des ateliers locaux à Bali pour vous 
                  offrir des pièces authentiques qui allient beauté, fonctionnalité et spiritualité.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">Matériaux nobles et durables</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">Techniques artisanales traditionnelles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">Commerce équitable avec les artisans</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-rustic rounded-full"></div>
                    <span className="text-charcoal font-medium">Pièces uniques et limitées</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-warm rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                      Fait avec Passion
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      Chaque pièce est créée avec amour et respect des traditions balinaises, 
                      pour apporter harmonie et sérénité dans votre foyer.
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
