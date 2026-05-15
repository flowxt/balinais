"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import CollectionProductGrid from "../../components/CollectionProductGrid";
import Cart from "../../components/Cart";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
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
      <ScrollToTopButton />

      <main>
        {/* Hero de la catégorie */}
        <section className="relative py-20 lg:py-28 bg-rustic overflow-hidden">
          {/* Motifs décoratifs */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-soft mb-6 tracking-wide">
              {category.name}
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-soft/80 max-w-2xl mx-auto leading-relaxed font-light">
              {category.description}
            </p>
          </div>
        </section>

        {/* Filtres rapides par catégorie - non sticky, scrolle avec la page */}
        <section className="relative bg-warm/85 backdrop-blur-md border-b border-charcoal/15 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <div className="flex flex-nowrap items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
              <Link
                href="/collections"
                className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-charcoal/25 bg-soft/70 text-charcoal text-[13px] sm:text-sm font-medium hover:bg-soft hover:border-charcoal/40 transition-all whitespace-nowrap shadow-sm"
              >
                Tous les articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-sm font-medium transition-all whitespace-nowrap shadow-sm ${
                    cat.id === category.id
                      ? "bg-rustic text-soft"
                      : "border border-charcoal/25 bg-soft/70 text-charcoal hover:bg-soft hover:border-charcoal/40"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Dégradé sur le bord droit pour indiquer le scroll horizontal sur mobile */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-warm/90 to-transparent sm:hidden"></div>
        </section>

        {/* Produits de la catégorie */}
        <CollectionProductGrid categoryFilter={category.id} />
      </main>

      <Footer />
      <Cart />
    </div>
  );
}
