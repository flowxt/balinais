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
        // Prendre seulement les 3 premiers produits
        setProducts(fetchedProducts.slice(0, 3));
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
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-white">
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6 tracking-wide">
            Les Coups de Cœur de Sandra
          </h2>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Découvrez une sélection d&apos;articles authentiques choisis avec passion.
            Chaque pièce raconte une histoire et apporte l&apos;âme de Bali dans votre intérieur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-warm/20 to-creamy/20 rounded-3xl p-8 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4 tracking-wide">
              Envie de découvrir plus de merveilles ?
            </h3>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Explorez toute notre collection d&apos;articles balinais authentiques 
              et laissez-vous séduire par la richesse de l&apos;artisanat traditionnel.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center bg-charcoal text-soft px-8 py-4 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 shadow-lg"
            >
              Voir tous nos articles
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
        </div>
      </div>
    </section>
  );
}
