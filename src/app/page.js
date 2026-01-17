import Link from "next/link";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-soft">
      <Navigation />
      <main>
        <Hero />

        {/* Section de présentation */}
        <section className="py-24 bg-gradient-to-b from-soft via-creamy/30 to-soft relative overflow-hidden">
          {/* Motif décoratif subtil */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute top-0 left-0 w-96 h-96 bg-warm rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-creamy rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.3em] uppercase mb-4">
                L&apos;excellence artisanale
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-8 tracking-wide">
                Notre savoir-faire
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-8"></div>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                Chaque article est soigneusement sélectionné pour sa qualité artisanale 
                et son authenticité, directement auprès des artisans balinais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-soft to-creamy rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-105 transition-all duration-500 shadow-lg shadow-warm/10">
                    <svg
                      className="w-9 h-9 text-charcoal/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-warm/0 via-warm/50 to-warm/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-4 tracking-wide">
                  Artisanat authentique
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Chaque pièce est créée par des artisans balinais selon des
                  traditions séculaires transmises de génération en génération.
                </p>
              </div>

              <div className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-soft to-creamy rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-105 transition-all duration-500 shadow-lg shadow-warm/10">
                    <svg
                      className="w-9 h-9 text-charcoal/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-warm/0 via-warm/50 to-warm/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-4 tracking-wide">
                  Matériaux nobles
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Rotin, bambou, bananier et matières naturelles 
                  sélectionnés avec le plus grand soin.
                </p>
              </div>

              <div className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-soft to-creamy rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-105 transition-all duration-500 shadow-lg shadow-warm/10">
                    <svg
                      className="w-9 h-9 text-charcoal/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-warm/0 via-warm/50 to-warm/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-4 tracking-wide">
                  Pièces uniques
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Chaque création est unique, avec ses propres variations 
                  qui font tout son charme et son authenticité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Coups de Cœur */}
        <FeaturedProducts />

        {/* Section Réassurance */}
        <section className="py-16 bg-gradient-to-r from-creamy/40 via-warm/20 to-creamy/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-charcoal/60 group-hover:text-warm transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-charcoal mb-1">Livraison soignée</h4>
                <p className="text-xs text-charcoal/50">Emballage premium</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-charcoal/60 group-hover:text-warm transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-charcoal mb-1">Paiement sécurisé</h4>
                <p className="text-xs text-charcoal/50">Transaction protégée</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-charcoal/60 group-hover:text-warm transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-charcoal mb-1">Fait main</h4>
                <p className="text-xs text-charcoal/50">Artisanat authentique</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-charcoal/60 group-hover:text-warm transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-charcoal mb-1">Service client</h4>
                <p className="text-xs text-charcoal/50">À votre écoute</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Call to Action */}
        <section className="py-28 bg-gradient-to-br from-soft via-creamy/30 to-warm/20 relative overflow-hidden">
          {/* Motifs décoratifs */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
            <span className="inline-block text-charcoal/50 text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Votre intérieur mérite l&apos;exception
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-8 tracking-wide leading-tight">
              Prêt à transformer<br className="hidden md:block" /> votre espace de vie ?
            </h2>
            <p className="text-lg text-charcoal/60 mb-12 leading-relaxed max-w-2xl mx-auto">
              Découvrez nos créations et laissez-vous inspirer par
              l&apos;élégance et la sérénité de l&apos;artisanat balinais authentique.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/collections"
                className="group bg-charcoal text-soft px-10 py-4 rounded-full font-medium hover:bg-charcoal/90 transition-all duration-300 shadow-xl shadow-charcoal/20 text-center inline-flex items-center justify-center"
              >
                Explorer la collection
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="border-2 border-charcoal/20 text-charcoal px-10 py-4 rounded-full font-medium hover:border-charcoal/40 hover:bg-white/50 transition-all duration-300 text-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
