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
        // Nettoyer l'ID pour Shopify (enlever le préfixe s'il existe)
        const cleanId = params.id.replace('gid://shopify/Product/', '');
        const fetchedProduct = await getProduct(`gid://shopify/Product/${cleanId}`);
        
        if (fetchedProduct) {
          // Debug: voir les informations du produit récupéré
          console.log("Produit récupéré:", fetchedProduct);
          console.log("Product availableForSale:", fetchedProduct.availableForSale);
          console.log("Variant info:", fetchedProduct.variants?.[0]);
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
      <div className="min-h-screen bg-soft">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
            <div className="text-charcoal text-lg">Chargement du produit...</div>
          </div>
        </div>
        <Cart />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-soft">
        <Navigation />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <svg className="w-16 h-16 text-rustic mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-serif font-bold text-charcoal mb-2">Produit non trouvé</h1>
            <p className="text-charcoal/70 mb-6">Ce produit n&apos;existe pas ou n&apos;est plus disponible.</p>
            <Link href="/collections" className="bg-charcoal text-soft px-6 py-3 rounded-lg font-medium hover:bg-rustic transition-colors duration-300">
              Retour aux collections
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
    <div className="min-h-screen bg-soft">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-charcoal/60 hover:text-charcoal">Accueil</Link></li>
            <li className="text-charcoal/40">/</li>
            <li><Link href="/collections" className="text-charcoal/60 hover:text-charcoal">Collections</Link></li>
            <li className="text-charcoal/40">/</li>
            <li className="text-charcoal font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images du produit */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-creamy rounded-2xl overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImageIndex]?.src || images[0]?.src}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-rustic text-lg">Aucune image</span>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index ? "ring-2 ring-rustic" : ""
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
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-serif text-3xl font-bold text-rustic">
                  {price} {currencyCode}
                </span>
                {/* Affichage du stock - on considère disponible si le variant sélectionné est disponible */}
                {selectedVariant?.availableForSale ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Disponible</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Non disponible</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-charcoal max-w-none">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">Description</h3>
              <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">
                {product.description || "Aucune description disponible."}
              </p>
            </div>

            {/* Sélecteur de variantes (si plusieurs variantes existent) */}
            {hasMultipleVariants && (
              <div className="space-y-3">
                <label className="font-medium text-charcoal block">
                  Sélectionnez une option :
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      disabled={!variant.availableForSale}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedVariantIndex === index
                          ? "border-rustic bg-rustic text-white"
                          : variant.availableForSale
                          ? "border-charcoal text-charcoal hover:border-rustic hover:text-rustic"
                          : "border-gray-300 text-gray-400 cursor-not-allowed line-through"
                      }`}
                    >
                      {variant.title}
                      {!variant.availableForSale && " (Épuisé)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sélecteur de quantité et ajout au panier */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-charcoal">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant?.availableForSale || !selectedVariant?.id}
                  className="flex-1 bg-charcoal text-soft px-8 py-4 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cartLoading ? "Ajout en cours..." : selectedVariant?.availableForSale ? "Ajouter au panier" : "Non disponible"}
                </button>
                
                <button className="flex-1 border-2 border-charcoal text-charcoal px-8 py-4 rounded-lg font-medium hover:bg-charcoal hover:text-soft transition-colors duration-300">
                  Contactez-nous
                </button>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-rustic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-charcoal">Artisanat balinais authentique</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-rustic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-charcoal">Matériaux nobles et durables</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-rustic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-charcoal">Livraison soignée</span>
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
