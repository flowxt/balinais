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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              À propos de Bohemian House
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              L&apos;histoire d&apos;une passion pour l&apos;art balinais
            </p>
          </div>
        </div>
      </section>

      {/* Section Sandra - Présentation zen avec Bali */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
              Rencontrez Sandra
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              La fondatrice de Bohemian House vous raconte son histoire
            </p>
          </div>

          {/* Layout alterné avec images entrelacées */}
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Section 1 : Introduction + Image plage à droite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-serif text-charcoal mb-6">
                  Rencontrez Sandra
                </h3>
                <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
                  <p>
                    Je m&apos;appelle Sandra, j&apos;ai 34 ans, et je suis ravie
                    de vous accueillir dans mon univers.
                  </p>
                  <p>
                    Mon aventure a commencé en <strong>2022</strong>, lors de
                    mon premier voyage à Bali, un véritable coup de cœur.
                    L&apos;île m&apos;a charmée par sa beauté, sa culture, et
                    surtout par son artisanat exceptionnel.
                  </p>
                  <p>
                    Passionnée depuis toujours par l&apos;artisanat et la
                    décoration d&apos;intérieur, c&apos;est là-bas que j&apos;ai
                    découvert un monde fascinant. Ce qui m&apos;a
                    particulièrement touchée, c&apos;est le savoir-faire,
                    l&apos;énergie, l&apos;amour et la passion que les artisans
                    mettent dans leurs créations, ainsi que leur persévérance à
                    transmettre leur art de génération en génération.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/plage-bali.jpg"
                    alt="Plage paradisiaque de Bali - Source d'inspiration"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-lg font-serif italic bg-black/20 backdrop-blur-sm rounded-md px-3 py-2 inline-block">
                      L&apos;île des Dieux, source d&apos;inspiration infinie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 : Image temple à gauche + Suite présentation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative lg:order-1">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/temple.jpg"
                    alt="Temple traditionnel balinais - Spiritualité et artisanat"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-lg font-serif italic bg-black/20 backdrop-blur-sm rounded-md px-3 py-2 inline-block">
                      Spiritualité et artisanat ancestral
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:order-2">
                <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
                  <p>
                    Un autre moment clé de mon parcours a été la lecture du
                    livre{" "}
                    <strong>« L&apos;homme qui voulait être heureux »</strong>{" "}
                    de Laurent Gounelle. Véritable révélation, il m&apos;a
                    encouragée à suivre mes passions et à me lancer dans ce
                    projet avec conviction et détermination.
                  </p>
                  <p>
                    En <strong>2023</strong>, j&apos;ai choisi de repartir à
                    Bali pour commencer cette aventure, un peu folle mais
                    excitante. J&apos;y ai exploré des ruelles et découvert des
                    ateliers incroyables où chaque objet est une pièce unique.
                  </p>
                  <p>
                    Chaque article a été soigneusement sélectionné pour apporter
                    une touche d&apos;exotisme et de sérénité à votre foyer,
                    tout en vous invitant à voyager à travers ses créations.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 : Conclusion centrée */}
            <div className="max-w-4xl mx-auto space-y-8 text-center">
              <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
                <p>
                  Aujourd&apos;hui, <strong>Bohemian House</strong> vous propose
                  des objets de décoration uniques, alliant tradition, qualité
                  et beauté, tout en soutenant l&apos;artisanat et les matières
                  premières.
                </p>
                <p>
                  Que ce soit des pots en rotin tissés, des paniers en bananier,
                  des poteries en argile ou des boîtes en bambou, chaque produit
                  est le fruit d&apos;une sélection minutieuse et d&apos;un
                  travail amoureux.
                </p>
                <p>
                  <strong>Merci de faire partie de cette aventure !</strong> Je
                  suis heureuse de partager avec vous un peu de Bali et de ma
                  passion pour la décoration et l&apos;artisanat.
                </p>
                <p>
                  Cette expérience a donné naissance à Bohemian House : une
                  boutique où chaque pièce voyage directement de l&apos;île des
                  Dieux pour apporter sérénité et élégance dans votre intérieur.
                </p>
                <p className="italic">
                  Si vous avez des questions ou besoin de conseils,
                  n&apos;hésitez pas à me contacter, je serai ravie de vous
                  aider.
                </p>
                <div className="mt-8">
                  <span className="text-lg font-medium text-rustic">
                    — Sandra
                  </span>
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
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Partager la beauté et l&apos;authenticité de l&apos;artisanat
              balinais, tout en soutenant les artisans et leurs traditions
              ancestrales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-charcoal rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-soft"
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
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                Sélection Authentique
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Chaque pièce est soigneusement choisie lors de mes voyages à
                Bali, directement dans les ateliers des artisans locaux.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-charcoal rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-soft"
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
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                Passion & Amour
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Mon amour pour l&apos;artisanat et la culture balinaise guide
                chacun de mes choix et se ressent dans chaque création.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 bg-charcoal rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-soft"
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
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                Voyage & Évasion
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Chaque objet vous invite à voyager et apporte une touche
                d&apos;exotisme et de sérénité dans votre foyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
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
                  Nos objets sont fabriqués à partir de matériaux naturels et
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
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
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
