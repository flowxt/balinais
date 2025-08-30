"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export default function APropos() {
  return (
    <>
      <Navigation />
      <Cart />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-creamy to-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-wide">
              À propos de Bohemian House
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              L&apos;histoire d&apos;une passion pour l&apos;art balinais
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Accueil
          </Link>
          <span className="text-charcoal/40">/</span>
          <span className="text-charcoal font-medium">À propos</span>
        </nav>
      </div>

      {/* Section Sandra */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-8 tracking-wide">
                L&apos;histoire de Sandra
              </h2>
              <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed">
                <p>
                  Tout a commencé lors d&apos;un voyage magique à Bali. Sandra
                  est tombée sous le charme de cette île extraordinaire, de sa
                  culture riche et de son artisanat d&apos;exception.
                </p>
                <p>
                  Fascinée par la beauté et l&apos;authenticité des meubles
                  balinais, elle a eu l&apos;idée de partager cette passion en
                  France. Chaque pièce qu&apos;elle sélectionne raconte une
                  histoire, porte en elle l&apos;âme de Bali et le savoir-faire
                  ancestral des artisans locaux.
                </p>
                <p>
                  Bohemian House est né de cette rencontre entre Sandra et
                  l&apos;art balinais : une boutique où chaque meuble voyage
                  tout droit de l&apos;île des dieux pour apporter sérénité et
                  élégance dans votre intérieur.
                </p>
              </div>
            </div>

            <div>
              <div className="relative h-80 bg-creamy rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-warm/30 to-charcoal/20 flex items-center justify-center">
                  <div className="text-center text-charcoal/60">
                    <div className="w-20 h-20 mx-auto mb-3 bg-charcoal/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <p className="font-serif text-lg">Photo de Sandra</p>
                    <p className="text-sm">À ajouter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Notre Mission */}
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
              Notre Mission
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Apporter l&apos;authenticité et la sérénité balinaise dans votre
              quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                Authenticité
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Chaque pièce est soigneusement sélectionnée directement auprès
                d&apos;artisans balinais authentiques.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center">
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
              <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                Passion
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Notre amour pour l&apos;art balinais guide chacun de nos choix
                et de nos recommandations.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                Sérénité
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Nos meubles apportent paix et harmonie, créant des espaces
                propices à la détente et à la méditation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-soft"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                  Commerce Équitable
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Nous travaillons directement avec les artisans balinais,
                  garantissant une rémunération juste et un partenariat durable.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-soft"
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
              <div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                  Respect de l&apos;Environnement
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Nos meubles sont fabriqués à partir de matériaux naturels et
                  durables, dans le respect de l&apos;environnement balinais.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-soft"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                  Savoir-faire Artisanal
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Chaque pièce est le fruit d&apos;un savoir-faire ancestral
                  transmis de génération en génération par les maîtres artisans
                  balinais.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-soft"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                  Unicité
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  Nos articles sont des pièces uniques ou en édition très
                  limitée, garantissant l&apos;exclusivité de votre décoration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-warm to-creamy">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
            Rejoignez l&apos;aventure Bohemian House
          </h2>
          <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
            Découvrez nos articles et laissez-vous transporter par la magie de
            Bali. Chaque pièce vous invite à créer un intérieur unique, empreint
            de sérénité et d&apos;authenticité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="bg-charcoal text-soft px-8 py-4 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 shadow-lg"
            >
              Découvrir nos articles
            </Link>
            <Link
              href="/contact"
              className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
