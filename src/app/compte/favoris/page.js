"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getProduct } from "@/lib/shopify";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";
import ProductCard from "@/app/components/ProductCard";

export default function Favoris() {
  const router = useRouter();
  const { loading: authLoading, isAuthenticated } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/connexion");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    async function fetchFavoriteProducts() {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productPromises = favorites.map((productId) => getProduct(productId));
        const fetchedProducts = await Promise.all(productPromises);
        // Filtrer les produits null (qui n'existent plus)
        setProducts(fetchedProducts.filter((p) => p !== null));
      } catch (error) {
        console.error("Erreur lors du chargement des favoris:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!favoritesLoading) {
      fetchFavoriteProducts();
    }
  }, [favorites, favoritesLoading]);

  if (authLoading) {
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

  return (
    <>
      <Navigation />
      <Cart />

      <main className="min-h-screen bg-gradient-to-b from-soft via-creamy/20 to-soft py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/compte" className="text-charcoal/50 hover:text-charcoal transition-colors">
                  Mon compte
                </Link>
              </li>
              <li className="text-charcoal/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-charcoal font-medium">Mes favoris</li>
            </ol>
          </nav>

          {/* En-tête */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Mes favoris
            </h1>
            <p className="text-charcoal/60">
              {products.length > 0
                ? `${products.length} article${products.length > 1 ? "s" : ""} dans vos favoris`
                : "Retrouvez ici vos articles coup de cœur"}
            </p>
          </div>

          {/* Contenu */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-charcoal/20 border-t-warm rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-charcoal/60">Chargement de vos favoris...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg shadow-charcoal/5 p-12 text-center">
              <div className="w-24 h-24 bg-soft rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Aucun favori pour le moment
              </h2>
              <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
                Parcourez notre boutique et cliquez sur le cœur pour ajouter des articles à vos favoris !
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-charcoal text-soft px-8 py-4 rounded-full font-medium hover:bg-warm transition-colors"
              >
                Découvrir la boutique
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Lien retour */}
          <div className="mt-12 text-center">
            <Link
              href="/compte"
              className="text-charcoal/50 hover:text-charcoal transition-colors text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à mon compte
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
