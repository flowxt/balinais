"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductsPreviewByCategory } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function CategoryPreview({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryPreview() {
      try {
        setLoading(true);
        const previewProducts = await getProductsPreviewByCategory(category.id, 4);
        setProducts(previewProducts);
      } catch (error) {
        console.error(`Erreur lors du chargement des produits pour ${category.name}:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryPreview();
  }, [category.id, category.name]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-wide">
            {category.name}
          </h2>
          <div className="w-24 h-8 bg-charcoal/10 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-charcoal/5 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-wide">
            {category.name}
          </h2>
        </div>
        <div className="text-center py-12 bg-gradient-to-br from-warm/10 to-creamy/20 rounded-2xl">
          <p className="text-charcoal/70 text-lg">
            Nouveaux articles {category.name.toLowerCase()} bientôt disponibles !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* En-tête de la catégorie */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-wide mb-2">
            {category.name}
          </h2>
          <p className="text-charcoal/70 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
        
        <Link
          href={`/collections/${category.slug}`}
          className="group flex items-center space-x-2 bg-gradient-to-r from-charcoal to-rustic text-soft px-6 py-3 rounded-full hover:from-rustic hover:to-charcoal transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="font-medium">Voir plus</span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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

      {/* Grille de produits en aperçu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Séparateur décoratif */}
      <div className="mt-16 flex items-center justify-center">
        <div className="h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent flex-1 max-w-xs"></div>
        <div className="mx-4 w-2 h-2 bg-charcoal/20 rounded-full"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent flex-1 max-w-xs"></div>
      </div>
    </div>
  );
}
