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
        {/* Hero de la catégorie */}
        <section className={`py-16 bg-gradient-to-br ${category.color}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-4 tracking-wide">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>
        </section>

        {/* Filtres rapides par catégorie */}
        <section className="bg-white border-b border-charcoal/5 sticky top-20 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/collections"
                className="px-5 py-2.5 rounded-full border border-charcoal/10 text-charcoal/70 text-sm font-medium hover:border-charcoal/30 hover:text-charcoal hover:bg-soft/50 transition-all whitespace-nowrap"
              >
                Tous les articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    cat.id === category.id
                      ? "bg-charcoal text-soft shadow-sm"
                      : "border border-charcoal/10 text-charcoal/70 hover:border-charcoal/30 hover:text-charcoal hover:bg-soft/50"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Produits de la catégorie */}
        <CollectionProductGrid categoryFilter={category.id} />
      </main>

      <Footer />
      <Cart />
    </div>
  );
}
