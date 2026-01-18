"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { extractProductId } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import ProductRating from "./ProductRating";

export default function ProductCard({ product, viewMode = "grid" }) {
  const { addToCart, loading } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const image = product.images?.[0];
  const secondImage = product.images?.[1];
  const productId = extractProductId(product.id);
  const hasMultipleVariants = product.variants && product.variants.length > 1;
  
  // Variante sélectionnée
  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];
  const displayPrice = selectedVariant?.price?.amount || "0";
  const currencyCode = selectedVariant?.price?.currencyCode || "EUR";

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedVariant?.id) {
      await addToCart(selectedVariant.id, 1);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden border border-charcoal/5 hover:border-warm/30 transition-all duration-500 hover:shadow-xl hover:shadow-warm/5">
        <div className="flex flex-col md:flex-row">
          {/* Image du produit */}
          <Link 
            href={`/produit/${productId}`} 
            className="relative w-full md:w-72 h-64 md:h-auto bg-soft/50 flex-shrink-0 overflow-hidden"
          >
            {image ? (
              <>
                <Image
                  src={image.src}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 288px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay subtil au hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500"></div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-soft">
                <span className="text-charcoal/30 text-sm">Aucune image</span>
              </div>
            )}
            
            {/* Badge si épuisé */}
            {!selectedVariant?.availableForSale && (
              <div className="absolute top-4 left-4 bg-charcoal/90 text-soft px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">
                Épuisé
              </div>
            )}
          </Link>

          {/* Informations du produit */}
          <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-3">
              <Link href={`/produit/${productId}`}>
                <h3 className="font-serif text-xl text-charcoal group-hover:text-warm transition-colors duration-300">
                  {product.title}
                </h3>
              </Link>
              <ProductRating productId={product.id} size="sm" />
              <p className="text-sm text-charcoal/60 line-clamp-2 leading-relaxed">{product.description}</p>
              
              {/* Prix */}
              <div className="pt-2">
                <span className="text-2xl font-light text-charcoal">{displayPrice}</span>
                <span className="text-sm text-charcoal/40 ml-1">{currencyCode}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:w-48">
              {/* Sélecteur de variantes */}
              {hasMultipleVariants && (
                <select
                  value={selectedVariantIndex}
                  onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-sm focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/50"
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
                className="w-full bg-charcoal text-soft py-3 rounded-xl text-sm font-medium hover:bg-warm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Ajout..." : selectedVariant?.availableForSale ? "Ajouter au panier" : "Épuisé"}
              </button>
              
              <Link 
                href={`/produit/${productId}`}
                className="block w-full text-center text-sm text-charcoal/60 hover:text-warm transition-colors py-1"
              >
                Voir les détails →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille par défaut - Design amélioré
  return (
    <div 
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-charcoal/5 hover:border-warm/20 transition-all duration-500 hover:shadow-2xl hover:shadow-warm/10 hover:-translate-y-1">
        {/* Image du produit */}
        <Link href={`/produit/${productId}`} className="relative aspect-[4/5] bg-soft/30 overflow-hidden">
          {image ? (
            <>
              {/* Image principale */}
              <Image
                src={image.src}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-all duration-700 ${isHovered && secondImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
              />
              {/* Deuxième image au hover (si disponible) */}
              {secondImage && (
                <Image
                  src={secondImage.src}
                  alt={`${product.title} - vue alternative`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-all duration-700 absolute inset-0 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
              )}
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-soft">
              <svg className="w-12 h-12 text-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Badge si épuisé */}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur-sm text-soft px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">
              Épuisé
            </div>
          )}

          {/* Bouton Favori */}
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton productId={product.id} />
          </div>

          {/* Bouton rapide d'ajout au panier */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={loading || !selectedVariant?.id || !selectedVariant?.availableForSale}
              className="w-full bg-charcoal/95 backdrop-blur-sm text-soft py-3 rounded-xl text-sm font-medium hover:bg-warm transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ajout...
                </span>
              ) : selectedVariant?.availableForSale ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Ajouter au panier
                </>
              ) : (
                "Épuisé"
              )}
            </button>
          </div>
        </Link>

        {/* Informations du produit */}
        <div className="p-5 flex flex-col flex-1">
          <Link href={`/produit/${productId}`} className="flex-1">
            <h3 className="font-serif text-lg text-charcoal mb-1 line-clamp-2 group-hover:text-warm transition-colors duration-300 leading-snug">
              {product.title}
            </h3>
            <div className="mb-2">
              <ProductRating productId={product.id} size="sm" />
            </div>
          </Link>

          {/* Prix et variantes */}
          <div className="mt-auto pt-3 border-t border-charcoal/5">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xl font-light text-charcoal">{displayPrice}</span>
                <span className="text-xs text-charcoal/40 ml-1">{currencyCode}</span>
              </div>
              
              {/* Indicateur de variantes */}
              {hasMultipleVariants && (
                <span className="text-[10px] text-charcoal/40 uppercase tracking-wider">
                  {product.variants.length} options
                </span>
              )}
            </div>

            {/* Sélecteur de variantes compact */}
            {hasMultipleVariants && (
              <div className="mt-3">
                <select
                  value={selectedVariantIndex}
                  onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-xs focus:ring-1 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 text-charcoal/70"
                >
                  {product.variants.map((variant, index) => (
                    <option key={variant.id} value={index} disabled={!variant.availableForSale}>
                      {variant.title}
                      {!variant.availableForSale && " (Épuisé)"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
