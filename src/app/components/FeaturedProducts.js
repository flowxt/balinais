"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await getAllProducts();
        
        // Mélanger aléatoirement les produits (Fisher-Yates shuffle)
        const shuffled = [...fetchedProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Prendre les 3 premiers produits après mélange
        setProducts(shuffled.slice(0, 3));
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
              <div className="text-charcoal text-lg">
                Chargement de nos coups de cœur...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-rustic mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-rustic text-lg">{error}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 text-warm mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="font-serif text-3xl text-charcoal mb-4">
              Nouvelles Créations à Venir
            </h3>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Sandra prépare avec soin de magnifiques pièces pour vous.
              Revenez bientôt pour découvrir ses derniers coups de cœur !
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-warm/10 via-creamy/20 to-soft relative">
      {/* Décoration subtile */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Sélection exclusive
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6 tracking-wide">
            Les Coups de Cœur de Sandra
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Une sélection d&apos;articles authentiques choisis avec passion.
            Chaque pièce raconte une histoire unique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Call to Action élégant */}
        <div className="text-center">
          <div className="relative inline-block">
            <Link
              href="/collections"
              className="group inline-flex items-center text-charcoal font-medium text-lg hover:text-warm transition-colors duration-300"
            >
              <span className="border-b-2 border-charcoal/20 group-hover:border-warm pb-1 transition-colors duration-300">
                Découvrir toute la collection
              </span>
              <svg
                className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300"
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
        </div>
      </div>
    </section>
  );
}
