// Configuration des catégories Bohemian House

export const categories = [
  {
    id: "luminaires",
    name: "Luminaires",
    slug: "luminaires",
    description:
      "Illuminez votre intérieur avec nos lampes et suspensions balinaises artisanales, créées à partir de matériaux naturels comme le bambou et le rotin.",
    image: "/images/categories/luminaires.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "arts-table",
    name: "Arts de la table",
    slug: "arts-de-la-table",
    description:
      "Découvrez notre vaisselle et accessoires de table sculptés dans le bois noble, pour des repas empreints de spiritualité balinaise.",
    image: "/images/categories/arts-table.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "decoration-murale",
    name: "Décoration murale",
    slug: "decoration-murale",
    description:
      "Ornez vos murs avec nos sculptures, masques et panneaux décoratifs traditionnels, témoins de l'art ancestral balinais.",
    image: "/images/categories/decoration-murale.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "boites-offrandes",
    name: "Boîtes d'offrandes",
    slug: "boites-offrandes",
    description:
      "Objets sacrés chargés de spiritualité, nos boîtes d'offrandes apportent paix et harmonie dans votre espace de méditation.",
    image: "/images/categories/boites-offrandes.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "decoration",
    name: "Décoration",
    slug: "decoration",
    description:
      "Sublimez votre intérieur avec nos objets décoratifs : statuettes, porte-encens, photophores et accessoires artisanaux balinais.",
    image: "/images/categories/decoration.jpg",
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "vases",
    name: "Vases",
    slug: "vases",
    description:
      "Découvrez nos vases artisanaux balinais, façonnés avec soin pour sublimer vos compositions florales et votre décoration.",
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
