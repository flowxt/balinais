"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { extractProductId } from "@/lib/utils";

export default function ProductCard({ product, viewMode = "grid" }) {
  const { addToCart, loading } = useCart();

  if (!product) return null;

  const variant = product.variants?.[0];
  const price = variant?.price?.amount || "0";
  const currencyCode = variant?.price?.currencyCode || "EUR";
  const image = product.images?.[0];
  const productId = extractProductId(product.id);

  const handleAddToCart = async () => {
    if (variant?.id) {
      await addToCart(variant.id, 1);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image du produit */}
          <div className="relative w-full md:w-64 h-48 md:h-auto bg-creamy flex-shrink-0">
            {image ? (
              <Image
                src={image.src}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-rustic">Aucune image</span>
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="p-6 flex-1">
            <div className="flex flex-col md:flex-row md:justify-between h-full">
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                  {product.title}
                </h3>
                <p className="text-charcoal/70 mb-4">{product.description}</p>
              </div>

              <div className="md:ml-6 flex flex-col justify-between items-end">
                <div className="font-serif mb-4">
                  <span className="text-xl font-semibold text-golden">
                    {price}
                  </span>
                  <span className="text-sm font-normal ml-1 text-golden/70">
                    {currencyCode}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={loading || !variant?.id}
                    className="bg-charcoal text-soft px-4 py-2 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Ajout..." : "Ajouter"}
                  </button>
                  <Link
                    href={`/produit/${productId}`}
                    className="border border-charcoal text-charcoal px-4 py-2 rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300 text-center"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille par défaut
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Image du produit */}
      <div className="relative h-64 bg-creamy flex-shrink-0">
        {image ? (
          <Image
            src={image.src}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-rustic">Aucune image</span>
          </div>
        )}
      </div>

      {/* Informations du produit */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          {product.title}
        </h3>

        <p className="text-charcoal/70 mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Section prix et boutons fixée en bas */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="font-serif">
              <span className="text-xl font-semibold text-golden">{price}</span>
              <span className="text-sm font-normal ml-1 text-golden/70">
                {currencyCode}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={loading || !variant?.id}
              className="flex-1 bg-charcoal text-soft px-4 py-2 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
            <Link
              href={`/produit/${productId}`}
              className="flex-1 border border-charcoal text-charcoal px-4 py-2 rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300 text-center"
            >
              Détails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
