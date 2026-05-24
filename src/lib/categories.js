// Configuration des catégories Bohemian House

export const categories = [
  {
    id: "luminaires",
    name: "Luminaires",
    slug: "luminaires",
    description:
      "Créez une ambiance douce et chaleureuse dans chaque pièce de votre intérieur avec nos luminaires, réalisés à la main dans des matières naturelles.",
    image: "/images/categories/luminaires.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "arts-table",
    name: "Arts de la table",
    slug: "arts-de-la-table",
    description:
      "Chaque détail compte autour d'une table, nos accessoires artisanaux y apportent chaleur, authenticité et charme.",
    image: "/images/categories/arts-table.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "decoration-murale",
    name: "Décoration murale",
    slug: "decoration-murale",
    description:
      "Habillez vos murs avec notre décoration murale artisanale, pensée pour créer une ambiance chaleureuse et authentique.",
    image: "/images/categories/decoration-murale.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "boites-offrandes",
    name: "Boîtes d'offrandes",
    slug: "boites-offrandes",
    description:
      "Apportez une touche d'authenticité et de sérénité à votre intérieur avec nos boîtes d'offrandes artisanales, inspirées des traditions balinaises.",
    image: "/images/categories/boites-offrandes.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "decoration",
    name: "Décoration",
    slug: "decoration",
    description:
      "Sublimez votre intérieur avec nos pièces décoratives artisanales sélectionnées pour leur charme et leur beauté.",
    image: "/images/categories/decoration.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "vases",
    name: "Vases",
    slug: "vases",
    description:
      "Découvrez nos vases artisanaux en matières naturelles, pensés pour apporter une touche chaleureuse et élégante à votre intérieur.",
    image: "/images/categories/vases.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "paniers",
    name: "Paniers",
    slug: "paniers",
    description:
      "Nos paniers tressés à la main à Bali allient fonctionnalité et esthétique, parfaits pour ranger et décorer avec élégance.",
    image: "/images/categories/paniers.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "housses-de-coussins",
    name: "Housses de coussins",
    slug: "housses-de-coussins",
    description:
      "Apportez une touche bohème et chaleureuse à votre intérieur avec nos housses de coussins tissées et brodées artisanalement.",
    image: "/images/categories/housses-de-coussins.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "mobilier",
    name: "Mobilier",
    slug: "mobilier",
    description:
      "Des meubles d'exception en bois noble et matériaux naturels, façonnés par les artisans balinais pour un intérieur authentique.",
    image: "/images/categories/mobilier.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id);
}
