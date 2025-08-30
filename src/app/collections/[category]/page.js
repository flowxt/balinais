"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import CollectionProductGrid from "../../components/CollectionProductGrid";
import Cart from "../../components/Cart";
import Footer from "../../components/Footer";
import { getCategoryBySlug, categories } from "@/lib/categories";

export default function CategoryPage() {
  const params = useParams();
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-soft">
      <Navigation />

      <main>
        {/* Breadcrumb */}
        <section className="py-6 bg-soft border-b border-creamy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                Accueil
              </Link>
              <span className="text-charcoal/40">/</span>
              <Link
                href="/collections"
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                Nos Articles
              </Link>
              <span className="text-charcoal/40">/</span>
              <span className="text-charcoal font-medium">{category.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero de la catégorie */}
        <section className={`py-20 bg-gradient-to-br ${category.color}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6 tracking-wide">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>
        </section>

        {/* Navigation entre catégories */}
        <section className="py-12 bg-soft border-b border-creamy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-lg font-medium text-charcoal mb-6">
              Autres types d&apos;articles :
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories
                .filter((cat) => cat.id !== category.id)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    className="px-4 py-2 border border-charcoal/20 text-charcoal rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300"
                  >
                    {cat.name}
                  </Link>
                ))}
              <Link
                href="/collections"
                className="px-4 py-2 bg-charcoal text-soft rounded-lg font-medium hover:bg-rustic transition-colors duration-300"
              >
                Tous nos articles
              </Link>
            </div>
          </div>
        </section>

        {/* Produits de la catégorie */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
                Nos {category.name}
              </h2>
              <p className="text-lg text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre sélection soigneusement choisie de{" "}
                {category.name.toLowerCase()}
                balinais authentiques.
              </p>
            </div>

            {/* TODO: Filtrer les produits par catégorie */}
            <CollectionProductGrid categoryFilter={category.id} />
          </div>
        </section>

        {/* Section informative spécifique à la catégorie */}
        <section className="py-20 bg-creamy/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-6">
              L&apos;Art derrière nos {category.name}
            </h3>
            <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
              Chaque pièce de cette catégorie est créée par des artisans
              balinais maîtrisant des techniques ancestrales transmises de
              génération en génération. Ces objets ne sont pas seulement
              décoratifs, ils portent en eux l&apos;âme et la spiritualité de
              Bali.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center px-6 py-3 bg-charcoal text-soft rounded-lg font-medium hover:bg-rustic transition-colors duration-300"
            >
              Explorer tous nos articles
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <Cart />
    </div>
  );
}
