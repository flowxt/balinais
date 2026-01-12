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

      {/* Hero Section - Plus élégant */}
      <section className="relative py-24 lg:py-32 bg-charcoal overflow-hidden">
        {/* Motifs décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-warm/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-block text-warm/70 text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Notre histoire
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-soft mb-8 tracking-wide">
              À propos de Bohemian House
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-soft/60 max-w-2xl mx-auto leading-relaxed font-light">
              L&apos;histoire d&apos;une passion pour l&apos;artisanat balinais
            </p>
          </div>
        </div>
      </section>

      {/* Section Sandra - Design zen et épuré */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction avec grande image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
                La fondatrice
              </span>
              <h2 className="font-serif text-4xl text-charcoal mb-8 leading-tight">
                Rencontrez Sandra
              </h2>
              <div className="space-y-6 text-charcoal/70 leading-relaxed">
                <p className="text-lg">
                  Je m&apos;appelle Sandra, j&apos;ai 34 ans, et je suis ravie
                  de vous accueillir dans mon univers.
                </p>
                <p>
                  Mon aventure a commencé en <span className="text-charcoal font-medium">2022</span>, lors de
                  mon premier voyage à Bali, un véritable coup de cœur.
                  L&apos;île m&apos;a charmée par sa beauté, sa culture, et
                  surtout par son artisanat exceptionnel.
                </p>
                <p>
                  Passionnée depuis toujours par l&apos;artisanat et la
                  décoration d&apos;intérieur, c&apos;est là-bas que j&apos;ai
                  découvert un monde fascinant.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-charcoal/10">
                <Image
                  src="/images/plage-bali.jpg"
                  alt="Plage paradisiaque de Bali"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-soft/90 text-lg font-serif italic">
                    L&apos;île des Dieux, source d&apos;inspiration infinie
                  </p>
                </div>
              </div>
              {/* Élément décoratif */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-warm/10 rounded-3xl -z-10"></div>
            </div>
          </div>

          {/* Citation mise en avant */}
          <div className="relative py-16 mb-32">
            <div className="absolute inset-0 bg-gradient-to-r from-soft via-creamy/20 to-soft rounded-3xl"></div>
            <div className="relative max-w-3xl mx-auto text-center px-8">
              <svg className="w-12 h-12 text-warm/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-xl lg:text-2xl text-charcoal/80 leading-relaxed font-light italic mb-6">
                Ce qui m&apos;a particulièrement touchée, c&apos;est le savoir-faire, l&apos;énergie, l&apos;amour et la passion que les artisans mettent dans leurs créations, ainsi que leur persévérance à transmettre leur art de génération en génération.
              </p>
              <span className="text-warm font-medium">— Sandra</span>
            </div>
          </div>

          {/* Le déclic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative">
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl shadow-charcoal/10">
                <Image
                  src="/images/temple.jpg"
                  alt="Temple traditionnel balinais"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-soft/90 text-lg font-serif italic">
                    Spiritualité et artisanat ancestral
                  </p>
                </div>
              </div>
              {/* Élément décoratif */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-creamy/30 rounded-3xl -z-10"></div>
            </div>

            <div>
              <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Le déclic
              </span>
              <h3 className="font-serif text-3xl text-charcoal mb-8 leading-tight">
                De la passion à l&apos;aventure
              </h3>
              <div className="space-y-6 text-charcoal/70 leading-relaxed">
                <p>
                  Un moment clé de mon parcours a été la lecture du livre
                  <span className="text-charcoal font-medium"> « L&apos;homme qui voulait être heureux »</span> de Laurent Gounelle. 
                  Véritable révélation, il m&apos;a encouragée à suivre mes passions.
                </p>
                <p>
                  En <span className="text-charcoal font-medium">2023</span>, j&apos;ai choisi de repartir à
                  Bali pour commencer cette aventure, un peu folle mais
                  excitante. J&apos;y ai exploré des ruelles et découvert des
                  ateliers incroyables où chaque objet est une pièce unique.
                </p>
                <p>
                  Chaque article a été soigneusement sélectionné pour apporter
                  une touche d&apos;exotisme et de sérénité à votre foyer.
                </p>
              </div>
            </div>
          </div>

          {/* Bohemian House aujourd'hui */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Aujourd&apos;hui
            </span>
            <h3 className="font-serif text-3xl text-charcoal mb-8 leading-tight">
              Bohemian House
            </h3>
            <div className="space-y-6 text-charcoal/70 leading-relaxed text-lg">
              <p>
                Aujourd&apos;hui, <span className="text-charcoal font-medium">Bohemian House</span> vous propose
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
              <p className="text-charcoal font-medium">
                Merci de faire partie de cette aventure !
              </p>
            </div>
            <div className="mt-10">
              <span className="font-serif text-2xl text-warm italic">— Sandra</span>
            </div>
          </div>

        </div>
      </section>

      {/* Section Nos Valeurs - Design moderne */}
      <section className="py-24 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Ce qui nous guide
            </span>
            <h2 className="font-serif text-4xl text-charcoal mb-6">
              Nos Valeurs
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Authenticité",
                desc: "Chaque pièce est choisie directement dans les ateliers balinais."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: "Passion",
                desc: "L'amour de l'artisanat guide chacun de nos choix."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                ),
                title: "Équité",
                desc: "Partenariat direct et juste avec les artisans locaux."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                ),
                title: "Unicité",
                desc: "Des pièces uniques pour une décoration exclusive."
              }
            ].map((value, i) => (
              <div 
                key={i} 
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-warm/5 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center mb-6 group-hover:bg-warm transition-colors duration-300">
                  <svg className="w-7 h-7 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action élégant */}
      <section className="py-28 bg-gradient-to-br from-soft via-creamy/30 to-warm/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-serif text-4xl text-charcoal mb-6 leading-tight">
            Rejoignez l&apos;aventure
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 leading-relaxed">
            Découvrez nos créations et laissez-vous transporter par la magie de
            Bali. Chaque pièce vous invite à créer un intérieur unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="group inline-flex items-center justify-center gap-2 bg-charcoal text-soft px-8 py-4 rounded-full font-medium hover:bg-warm transition-all duration-300 shadow-lg shadow-charcoal/20"
            >
              Découvrir la boutique
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-charcoal/20 text-charcoal px-8 py-4 rounded-full font-medium hover:border-charcoal/40 hover:bg-white/50 transition-all duration-300"
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
