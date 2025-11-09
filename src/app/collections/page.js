"use client";

import Link from "next/link";
import Navigation from "../components/Navigation";
import CollectionProductGrid from "../components/CollectionProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { categories } from "@/lib/categories";

export default function Collections() {
  return (
    <div className="min-h-screen bg-soft">
      <Navigation />
      <main>
        {/* Hero Section Collections */}
        <section className="relative py-16 bg-gradient-to-br from-creamy to-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-4 tracking-wide">
              Nos Articles
            </h1>
            <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Découvrez notre collection d&apos;articles balinais authentiques
            </p>
          </div>
        </section>

        {/* Filtres rapides par catégorie */}
        <section className="bg-white border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-charcoal whitespace-nowrap">
                Catégories :
              </span>
              <Link
                href="/collections"
                className="px-4 py-2 rounded-full border border-charcoal bg-charcoal text-white text-sm font-medium hover:bg-rustic transition-colors whitespace-nowrap"
              >
                Tous
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.slug}`}
                  className="px-4 py-2 rounded-full border border-gray-300 text-charcoal text-sm font-medium hover:border-charcoal hover:bg-gray-50 transition-all whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Grille de tous les produits avec filtres */}
        <CollectionProductGrid />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
