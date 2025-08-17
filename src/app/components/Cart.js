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
  } = useCart();

  if (!isOpen) return null;

  const lineItems = checkout?.lineItems || [];
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={closeCart} />

      {/* Panier Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Panier ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full"
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
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-gray-500">
                  Découvrez nos magnifiques meubles balinais
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    {/* Image du produit */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {item.variant?.image ? (
                        <Image
                          src={item.variant.image.src}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">Image</span>
                        </div>
                      )}
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-1">
                      <h4 className="font-medium text-charcoal text-sm">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Quantité: {item.quantity}
                      </p>
                      <p className="font-semibold text-rustic text-sm">
                        {item.variant?.price?.amount}{" "}
                        {item.variant?.price?.currencyCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer avec total et checkout */}
          {lineItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg font-semibold text-charcoal">
                  Total:
                </span>
                <span className="font-serif text-xl font-bold text-rustic">
                  {totalPrice} EUR
                </span>
              </div>

              <button
                onClick={redirectToCheckout}
                className="w-full bg-charcoal text-white py-3 px-6 rounded-lg font-medium hover:bg-rustic transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Procéder au paiement"}
              </button>

              <button
                onClick={closeCart}
                className="w-full border border-charcoal text-charcoal py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
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
