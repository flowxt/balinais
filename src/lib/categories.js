// Configuration des catégories Bohemian House

export const categories = [
  {
    id: "luminaires",
    name: "Luminaires",
    slug: "luminaires",
    description:
      "Illuminez votre intérieur avec nos lampes et suspensions balinaises artisanales, créées à partir de matériaux naturels comme le bambou et le rotin.",
    image: "/images/categories/luminaires.jpg", // À ajouter
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "arts-table",
    name: "Arts de la table",
    slug: "arts-de-la-table",
    description:
      "Découvrez notre vaisselle et accessoires de table sculptés dans le bois noble, pour des repas empreints de spiritualité balinaise.",
    image: "/images/categories/arts-table.jpg", // À ajouter
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "decoration-murale",
    name: "Décoration murale",
    slug: "decoration-murale",
    description:
      "Ornez vos murs avec nos sculptures, masques et panneaux décoratifs traditionnels, témoins de l'art ancestral balinais.",
    image: "/images/categories/decoration-murale.jpg", // À ajouter
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "boites-offrandes",
    name: "Boîtes d'offrandes",
    slug: "boites-offrandes",
    description:
      "Objets sacrés chargés de spiritualité, nos boîtes d'offrandes apportent paix et harmonie dans votre espace de méditation.",
    image: "/images/categories/boites-offrandes.jpg", // À ajouter
    color: "from-warm to-creamy",
    textColor: "text-charcoal",
  },
  {
    id: "petites-decorations",
    name: "Petites décorations",
    slug: "petites-decorations",
    description:
      "Sublimez votre décoration avec nos petits objets d'art : statuettes, porte-encens, photophores et accessoires décoratifs.",
    image: "/images/categories/petites-decorations.jpg", // À ajouter
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
