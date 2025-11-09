"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { extractProductId } from "@/lib/utils";

export default function ProductCard({ product, viewMode = "grid" }) {
  const { addToCart, loading } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) return null;

  const image = product.images?.[0];
  const productId = extractProductId(product.id);
  const hasMultipleVariants = product.variants && product.variants.length > 1;
  
  // Variante sélectionnée
  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];
  const displayPrice = selectedVariant?.price?.amount || "0";
  const currencyCode = selectedVariant?.price?.currencyCode || "EUR";

  const handleAddToCart = async () => {
    if (selectedVariant?.id) {
      await addToCart(selectedVariant.id, 1);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Image du produit */}
          <Link href={`/produit/${productId}`} className="relative w-full md:w-64 h-56 md:h-auto bg-gray-50 flex-shrink-0 overflow-hidden">
            {image ? (
              <Image
                src={image.src}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400 text-sm">Aucune image</span>
              </div>
            )}
            
            {/* Badge si épuisé */}
            {!selectedVariant?.availableForSale && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                Épuisé
              </div>
            )}
          </Link>

          {/* Informations du produit */}
          <div className="p-5 flex-1 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <Link href={`/produit/${productId}`}>
                <h3 className="font-medium text-lg text-charcoal mb-2 hover:text-rustic transition-colors">
                  {product.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              
              {/* Prix */}
              <div className="mb-3">
                <span className="text-2xl font-semibold text-golden">{displayPrice}</span>
                <span className="text-sm text-gray-500 ml-1">{currencyCode}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:w-56">
              {/* Sélecteur de variantes */}
              {hasMultipleVariants && (
                <select
                  value={selectedVariantIndex}
                  onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-rustic focus:border-rustic"
                >
                  {product.variants.map((variant, index) => (
                    <option key={variant.id} value={index} disabled={!variant.availableForSale}>
                      {variant.title} - {variant.price.amount} {variant.price.currencyCode}
                      {!variant.availableForSale && " (Épuisé)"}
                    </option>
                  ))}
                </select>
              )}

              {/* Boutons d'action */}
              <button
                onClick={handleAddToCart}
                disabled={loading || !selectedVariant?.id || !selectedVariant?.availableForSale}
                className="group/btn w-full bg-charcoal text-white py-2.5 rounded-md text-sm font-medium hover:bg-rustic transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    "Ajout..."
                  ) : selectedVariant?.availableForSale ? (
                    <>
                      Ajouter
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </>
                  ) : (
                    "Épuisé"
                  )}
                </span>
              </button>
              
              <Link 
                href={`/produit/${productId}`}
                className="block w-full text-center text-sm text-charcoal hover:text-rustic transition-colors py-1 mt-2"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille par défaut
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden border border-gray-100">
      {/* Image du produit */}
      <Link href={`/produit/${productId}`} className="relative aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">Aucune image</span>
          </div>
        )}
        
        {/* Badge si épuisé */}
        {!selectedVariant?.availableForSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            Épuisé
          </div>
        )}
      </Link>

      {/* Informations du produit */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/produit/${productId}`}>
          <h3 className="font-medium text-charcoal mb-2 line-clamp-2 hover:text-rustic transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Prix */}
        <div className="mb-3">
          <span className="text-xl font-semibold text-golden">{displayPrice}</span>
          <span className="text-sm text-gray-500 ml-1">{currencyCode}</span>
        </div>

        {/* Sélecteur de variantes */}
        {hasMultipleVariants && (
          <div className="mb-3">
            <select
              value={selectedVariantIndex}
              onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-rustic focus:border-rustic"
            >
              {product.variants.map((variant, index) => (
                <option key={variant.id} value={index} disabled={!variant.availableForSale}>
                  {variant.title} - {variant.price.amount} {variant.price.currencyCode}
                  {!variant.availableForSale && " (Épuisé)"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={loading || !selectedVariant?.id || !selectedVariant?.availableForSale}
            className="group/btn w-full bg-charcoal text-white py-2.5 rounded-md text-sm font-medium hover:bg-rustic transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                "Ajout..."
              ) : selectedVariant?.availableForSale ? (
                <>
                  Ajouter
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </>
              ) : (
                "Épuisé"
              )}
            </span>
          </button>
          
          <Link 
            href={`/produit/${productId}`}
            className="block w-full text-center text-sm text-charcoal hover:text-rustic transition-colors py-1"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
}
