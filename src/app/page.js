import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-soft">
      <Navigation />
      <main>
        <Hero />

        {/* Section de présentation */}
        <section className="py-20 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
                Notre savoir-faire
              </h2>
              <p className="text-lg text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
                Chaque meuble de notre collection est soigneusement sélectionné
                pour sa qualité artisanale et son authenticité. Nous travaillons
                directement avec des artisans balinais pour vous offrir des
                pièces uniques qui transforment votre espace de vie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Artisanat authentique
                </h3>
                <p className="text-charcoal/70">
                  Chaque pièce est créée par des artisans balinais selon des
                  traditions séculaires.
                </p>
              </div>

              <div className="text-center p-6">
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Matériaux nobles
                </h3>
                <p className="text-charcoal/70">
                  Bois de teck, bambou et matières naturelles sélectionnés avec
                  soin.
                </p>
              </div>

              <div className="text-center p-6">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  Pièces uniques
                </h3>
                <p className="text-charcoal/70">
                  Collection limitée pour garantir le caractère exclusif de
                  votre intérieur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Produits Shopify */}
        <ProductGrid />

        {/* Section Call to Action */}
        <section className="py-20 bg-gradient-to-r from-warm to-creamy">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
              Prêt à transformer votre espace ?
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              Découvrez nos collections et laissez-vous inspirer par
              l&apos;élégance et la sérénité du mobilier balinais authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-charcoal text-soft px-8 py-4 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 shadow-lg">
                Voir nos collections
              </button>
              <button className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300">
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
