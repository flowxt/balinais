"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-charcoal text-lg">Chargement des produits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-rustic text-lg">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="font-serif text-2xl text-charcoal mb-4">
          Aucun produit disponible pour le moment
        </h3>
        <p className="text-charcoal/70">
          Nos nouveaux articles arrivent bientôt !
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Nos Articles
          </h2>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Découvrez notre sélection d&apos;articles balinais authentiques,
            chaque pièce étant soigneusement choisie pour sa qualité et son
            caractère unique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
