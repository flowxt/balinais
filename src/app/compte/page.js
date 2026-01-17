"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export default function Compte() {
  const router = useRouter();
  const { customer, loading, isAuthenticated, logout } = useAuth();
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/connexion");
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <Cart />
        <main className="min-h-screen bg-gradient-to-b from-soft via-creamy/20 to-soft py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-charcoal/20 border-t-warm rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-charcoal/60">Chargement...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Formater les commandes
  const orders = customer?.orders?.edges?.map((edge) => edge.node) || [];

  return (
    <>
      <Navigation />
      <Cart />

      <main className="min-h-screen bg-gradient-to-b from-soft via-creamy/20 to-soft py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* En-tête du compte */}
          <div className="bg-charcoal rounded-3xl p-8 md:p-12 mb-8 text-soft relative overflow-hidden">
            {/* Motifs décoratifs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-warm/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-soft/60 text-sm mb-2">Bienvenue dans votre espace</p>
                  <h1 className="font-serif text-3xl md:text-4xl font-light">
                    Bonjour {customer?.firstName || ""}
                  </h1>
                  <p className="text-soft/70 mt-2">{customer?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="self-start md:self-auto px-6 py-3 border border-soft/30 rounded-xl text-soft/80 hover:bg-soft/10 hover:border-soft/50 transition-all text-sm font-medium"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          {/* Cartes de navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Favoris */}
            <Link
              href="/compte/favoris"
              className="group bg-white rounded-2xl p-6 shadow-lg shadow-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-warm/20 to-creamy rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-warm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Mes favoris</h3>
              <p className="text-charcoal/60 text-sm mb-3">
                {favoritesCount > 0
                  ? `${favoritesCount} article${favoritesCount > 1 ? "s" : ""} sauvegardé${favoritesCount > 1 ? "s" : ""}`
                  : "Aucun favori pour le moment"}
              </p>
              <span className="text-warm font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Voir mes favoris
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Commandes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-charcoal/5">
              <div className="w-14 h-14 bg-gradient-to-br from-creamy to-soft rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Mes commandes</h3>
              <p className="text-charcoal/60 text-sm mb-3">
                {orders.length > 0
                  ? `${orders.length} commande${orders.length > 1 ? "s" : ""}`
                  : "Aucune commande"}
              </p>
              <span className="text-charcoal/40 text-sm">
                Historique ci-dessous
              </span>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className="group bg-white rounded-2xl p-6 shadow-lg shadow-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-soft to-creamy rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Besoin d&apos;aide ?</h3>
              <p className="text-charcoal/60 text-sm mb-3">
                Sandra est à votre écoute
              </p>
              <span className="text-warm font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Nous contacter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Historique des commandes */}
          <div className="bg-white rounded-3xl shadow-lg shadow-charcoal/5 p-8">
            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Historique des commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-soft rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">
                  Aucune commande pour le moment
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Découvrez nos créations uniques et passez votre première commande !
                </p>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 bg-charcoal text-soft px-6 py-3 rounded-full font-medium hover:bg-warm transition-colors"
                >
                  Découvrir la boutique
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-charcoal/10 rounded-2xl p-6 hover:border-warm/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-charcoal">
                            Commande #{order.orderNumber}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.fulfillmentStatus === "FULFILLED"
                                ? "bg-green-100 text-green-700"
                                : order.fulfillmentStatus === "IN_PROGRESS"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.fulfillmentStatus === "FULFILLED"
                              ? "Livrée"
                              : order.fulfillmentStatus === "IN_PROGRESS"
                              ? "En cours"
                              : "En préparation"}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal/60">
                          {new Date(order.processedAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-charcoal text-lg">
                          {order.totalPrice.amount} {order.totalPrice.currencyCode}
                        </p>
                      </div>
                    </div>

                    {/* Aperçu des articles */}
                    {order.lineItems?.edges?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-charcoal/5">
                        <div className="flex flex-wrap gap-2">
                          {order.lineItems.edges.slice(0, 3).map((item, index) => (
                            <span
                              key={index}
                              className="text-xs text-charcoal/60 bg-soft px-3 py-1 rounded-full"
                            >
                              {item.node.title} × {item.node.quantity}
                            </span>
                          ))}
                          {order.lineItems.edges.length > 3 && (
                            <span className="text-xs text-charcoal/40 px-3 py-1">
                              +{order.lineItems.edges.length - 3} autre(s)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
