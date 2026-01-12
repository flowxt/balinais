"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/shopify";
import { useCart } from "@/contexts/CartContext";
import Navigation from "../../components/Navigation";
import Cart from "../../components/Cart";
import Footer from "../../components/Footer";

export default function ProductPage() {
  const params = useParams();
  const { addToCart, loading: cartLoading } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const cleanId = params.id.replace('gid://shopify/Product/', '');
        const fetchedProduct = await getProduct(`gid://shopify/Product/${cleanId}`);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Produit non trouvé");
        }
      } catch (err) {
        setError("Erreur lors du chargement du produit");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    const selectedVariant = product?.variants?.[selectedVariantIndex];
    if (selectedVariant?.id) {
      await addToCart(selectedVariant.id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-charcoal/20 border-t-warm rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-charcoal/60 font-light">Chargement du produit...</p>
          </div>
        </div>
        <Cart />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex justify-center items-center py-32">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-charcoal mb-3">Produit non trouvé</h1>
            <p className="text-charcoal/60 mb-8 leading-relaxed">Ce produit n&apos;existe pas ou n&apos;est plus disponible dans notre boutique.</p>
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-2 bg-charcoal text-soft px-6 py-3 rounded-full font-medium hover:bg-warm transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la boutique
            </Link>
          </div>
        </div>
        <Cart />
      </div>
    );
  }

  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];
  const price = selectedVariant?.price?.amount || "0";
  const currencyCode = selectedVariant?.price?.currencyCode || "EUR";
  const images = product.images || [];
  const hasMultipleVariants = product.variants && product.variants.length > 1;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb élégant */}
        <nav className="mb-8 lg:mb-12">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-charcoal/40 hover:text-charcoal transition-colors">
                Accueil
              </Link>
            </li>
            <li className="text-charcoal/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/collections" className="text-charcoal/40 hover:text-charcoal transition-colors">
                Boutique
              </Link>
            </li>
            <li className="text-charcoal/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-charcoal font-medium truncate max-w-[200px]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Galerie d'images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-soft/30 rounded-3xl overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImageIndex]?.src || images[0]?.src}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg className="w-20 h-20 text-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? "ring-2 ring-warm ring-offset-2" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div className="lg:py-4">
            {/* Titre et prix */}
            <div className="mb-8">
              <h1 className="font-serif text-3xl lg:text-4xl text-charcoal mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-3xl lg:text-4xl font-light text-charcoal">
                    {price}
                  </span>
                  <span className="text-lg text-charcoal/40 ml-2">{currencyCode}</span>
                </div>
                
                {/* Disponibilité */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  selectedVariant?.availableForSale 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedVariant?.availableForSale ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {selectedVariant?.availableForSale ? 'En stock' : 'Épuisé'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-charcoal/10">
              {product.descriptionHtml ? (
                <div 
                  className="prose prose-charcoal max-w-none text-charcoal/70 leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-charcoal/70 leading-relaxed">
                  {product.description || "Aucune description disponible."}
                </p>
              )}
            </div>

            {/* Encart "Réalisé à la main" */}
            <div className="mb-8 bg-gradient-to-r from-soft via-creamy/20 to-soft rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal mb-2">
                    Réalisé à la main
                  </h4>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    Fidèles à notre engagement envers l&apos;artisanat d&apos;exception et le fait main, chaque création présente un caractère unique, avec de légères variations de couleur, de texture et de dimensions.
                  </p>
                </div>
              </div>
            </div>

            {/* Sélecteur de variantes */}
            {hasMultipleVariants && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Choisissez une option
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      disabled={!variant.availableForSale}
                      className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                        selectedVariantIndex === index
                          ? "bg-charcoal text-soft shadow-lg"
                          : variant.availableForSale
                          ? "bg-soft text-charcoal hover:bg-charcoal/5 border border-charcoal/10"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                      }`}
                    >
                      {variant.title}
                      {!variant.availableForSale && " (Épuisé)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantité et ajout au panier */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-charcoal">Quantité</span>
                <div className="flex items-center bg-soft rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-16 h-12 flex items-center justify-center font-medium text-charcoal border-x border-charcoal/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant?.availableForSale || !selectedVariant?.id}
                  className="flex-1 bg-charcoal text-soft px-8 py-4 rounded-xl font-medium hover:bg-warm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {cartLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ajout en cours...
                    </>
                  ) : selectedVariant?.availableForSale ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Ajouter au panier
                    </>
                  ) : (
                    "Non disponible"
                  )}
                </button>
                
                <Link 
                  href="/contact"
                  className="flex-1 sm:flex-none border border-charcoal/20 text-charcoal px-8 py-4 rounded-xl font-medium hover:bg-soft hover:border-charcoal/30 transition-all duration-300 text-center"
                >
                  Une question ?
                </Link>
              </div>
            </div>

            {/* Avantages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-charcoal/10">
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <div className="w-10 h-10 bg-soft rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Artisanat balinais</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <div className="w-10 h-10 bg-soft rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span>Livraison soignée</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/70">
                <div className="w-10 h-10 bg-soft rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
    </div>
  );
}
