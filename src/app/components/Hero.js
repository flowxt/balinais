import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/meuble-hero.png"
          alt="Mobilier balinais Bohemian House"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Titre principal */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight drop-shadow-2xl tracking-wide">
            Bohemian House
          </h1>

          {/* Sous-titre */}
          <p className="font-serif text-xl md:text-2xl text-white/90 mb-8 italic drop-shadow-lg font-light tracking-wide">
            L&apos;art du mobilier balinais authentique
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-light">
            Découvrez notre collection exclusive de meubles balinais, où chaque
            pièce raconte une histoire et apporte une atmosphère zen et élégante
            à votre intérieur.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white/90 text-charcoal px-8 py-4 rounded-lg font-medium hover:bg-white transition-colors duration-300 shadow-lg backdrop-blur-sm">
              Découvrir nos collections
            </button>
            <button className="border-2 border-white/80 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 backdrop-blur-sm transition-colors duration-300">
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Élément décoratif */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
