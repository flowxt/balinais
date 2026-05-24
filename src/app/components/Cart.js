"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Cart() {
  const {
    isOpen,
    closeCart,
    checkout,
    loading,
    getTotalItems,
    getTotalPrice,
    redirectToCheckout,
    removeFromCart,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  const lineItems = checkout?.lineItems || [];
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Backdrop avec flou - couvre toute la page y compris la navbar pour cohérence visuelle */}
      <div 
        className="fixed inset-0 bg-charcoal/15 backdrop-blur-md z-[60] animate-in fade-in duration-300" 
        onClick={closeCart} 
      />

      {/* Panier Sidebar - élégant et lumineux, au-dessus du backdrop et de la navbar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-soft via-creamy/40 to-soft z-[70] shadow-2xl shadow-charcoal/30 transform transition-all duration-500 flex flex-col">
        {/* Halo décoratif */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-warm/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-creamy/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-warm/30 bg-rustic">
            <h2 className="font-serif text-xl font-medium text-soft tracking-wide">
              Panier ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-soft/15 rounded-full text-soft transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenu du panier */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-charcoal">Chargement...</div>
              </div>
            ) : lineItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-warm/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-charcoal/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3 tracking-wide">
                  Votre panier est vide
                </h3>
                <p className="text-charcoal/70 text-sm">
                  Découvrez nos magnifiques pièces artisanales
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-start gap-4 p-4 bg-soft rounded-xl shadow-sm border border-warm/20 hover:border-warm/40 transition-colors"
                  >
                    {/* Image du produit */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      {item.variant?.image ? (
                        <Image
                          src={item.variant.image.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-creamy/40 flex items-center justify-center">
                          <span className="text-xs text-charcoal/50">Image</span>
                        </div>
                      )}
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-1 min-w-0 pr-8">
                      <h4 className="font-serif text-sm text-charcoal leading-tight mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      {item.variant?.title && item.variant.title !== "Default Title" && (
                        <p className="text-charcoal/55 text-[11px] mb-2">
                          {item.variant.title}
                        </p>
                      )}

                      {/* Sélecteur de quantité - / nombre / + */}
                      <div className="flex items-center gap-2 mt-2 mb-2">
                        <div className="inline-flex items-center bg-creamy/40 border border-warm/30 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={loading}
                            aria-label="Diminuer la quantité"
                            className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-warm/30 transition-colors disabled:opacity-40"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center text-xs font-semibold text-charcoal border-x border-warm/30">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={loading}
                            aria-label="Augmenter la quantité"
                            className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-warm/30 transition-colors disabled:opacity-40"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <span className="inline-flex items-baseline gap-1 px-2.5 py-1 bg-warm rounded-full">
                        <span className="text-xs font-semibold text-charcoal leading-none">
                          {item.variant?.price?.amount}
                        </span>
                        <span className="text-[8px] font-semibold tracking-[0.2em] uppercase text-charcoal/70">
                          {item.variant?.price?.currencyCode}
                        </span>
                      </span>
                    </div>

                    {/* Bouton supprimer en haut à droite */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                      aria-label="Supprimer cet article du panier"
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-charcoal/50 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer avec total et checkout */}
          {lineItems.length > 0 && (
            <div className="border-t border-warm/40 bg-gradient-to-b from-warm/50 to-warm/30 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg text-charcoal tracking-wide">
                  Total
                </span>
                <span className="inline-flex items-baseline gap-2 px-5 py-2 bg-rustic rounded-full shadow-sm">
                  <span className="font-serif text-xl font-medium text-soft tracking-wide leading-none">
                    {totalPrice}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-soft/85">
                    EUR
                  </span>
                </span>
              </div>

              <button
                onClick={redirectToCheckout}
                className="w-full bg-charcoal text-soft py-4 px-6 rounded-xl font-medium hover:bg-rustic transition-colors duration-300 shadow-lg shadow-charcoal/20 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "Chargement..." : (
                  <>
                    Procéder au paiement
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              <button
                onClick={closeCart}
                className="w-full border border-charcoal/30 text-charcoal py-3 px-6 rounded-xl font-medium hover:bg-soft hover:border-charcoal/50 transition-colors duration-300"
              >
                Continuer mes achats
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

