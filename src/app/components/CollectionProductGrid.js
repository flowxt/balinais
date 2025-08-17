"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function CollectionProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid ou list
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Fonction de tri des produits
  const sortedProducts = products.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseFloat(a.variants?.[0]?.price?.amount || 0) -
          parseFloat(b.variants?.[0]?.price?.amount || 0)
        );
      case "price-high":
        return (
          parseFloat(b.variants?.[0]?.price?.amount || 0) -
          parseFloat(a.variants?.[0]?.price?.amount || 0)
        );
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0; // ordre par défaut
    }
  });

  if (loading) {
    return (
      <section className="py-20 bg-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
              <div className="text-charcoal text-lg">Chargement de nos trésors balinais...</div>
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
              <svg className="w-16 h-16 text-rustic mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <svg className="w-24 h-24 text-warm mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="font-serif text-3xl text-charcoal mb-4">
              Nouvelles Collections à Venir
            </h3>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Nos artisans balinais préparent avec soin de magnifiques pièces pour vous. 
              Revenez bientôt pour découvrir nos dernières créations !
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contrôles d'affichage et tri */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-4 md:mb-0">
            <p className="text-charcoal/70">
              {products.length} {products.length === 1 ? "produit" : "produits"} disponible{products.length > 1 ? "s" : ""}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sélecteur de tri */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-charcoal font-medium">Trier par:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-rustic focus:border-transparent"
              >
                <option value="featured">Sélection</option>
                <option value="name">Nom (A-Z)</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>
            
            {/* Sélecteur de vue */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v8h8V3H3zm10 0v8h8V3h-8zM3 13v8h8v-8H3zm10 0v8h8v-8h-8z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "space-y-6"
        }>
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Message informatif si peu de produits */}
        {products.length <= 3 && (
          <div className="mt-16 text-center p-8 bg-creamy/50 rounded-2xl">
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
              Plus de merveilles arrivent bientôt !
            </h3>
            <p className="text-charcoal/70 leading-relaxed">
              Nos artisans balinais travaillent actuellement sur de nouvelles pièces exceptionnelles. 
              Suivez-nous pour être informé des dernières arrivées.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
