"use client";

import Link from "next/link";
import Navigation from "../components/Navigation";
import CollectionProductGrid from "../components/CollectionProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { categories } from "@/lib/categories";

export default function Collections() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        {/* Hero Section Boutique */}
        <section className="relative py-20 lg:py-28 bg-charcoal overflow-hidden">
          {/* Motifs décoratifs */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="inline-block text-warm/70 text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Artisanat balinais authentique
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-soft mb-6 tracking-wide">
              La Boutique
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-soft/60 max-w-xl mx-auto leading-relaxed font-light">
              Découvrez notre collection d&apos;articles uniques, sélectionnés avec passion à Bali
            </p>
          </div>
        </section>

        {/* Filtres rapides par catégorie */}
        <section className="bg-white border-b border-charcoal/5 sticky top-20 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-sm text-charcoal/50 whitespace-nowrap hidden sm:block">
                Filtrer :
              </span>
              <Link
                href="/collections"
                className="px-5 py-2.5 rounded-full bg-charcoal text-soft text-sm font-medium hover:bg-warm transition-colors whitespace-nowrap shadow-sm"
              >
                Tous les articles
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.slug}`}
                  className="px-5 py-2.5 rounded-full border border-charcoal/10 text-charcoal/70 text-sm font-medium hover:border-charcoal/30 hover:text-charcoal hover:bg-soft/50 transition-all whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Grille de tous les produits avec filtres */}
        <section className="bg-soft/30">
          <CollectionProductGrid />
        </section>
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
