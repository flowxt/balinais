"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAllProducts, getProductsByCategory } from "@/lib/shopify";
import ProductCard from "./ProductCard";

// Normalise une chaîne pour la recherche : minuscules + sans accents.
// Permet de matcher "Décoration" avec "decoration", "boîte" avec "boite", etc.
function normalizeForSearch(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function CollectionProductGrid({ categoryFilter = null }) {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid ou list
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let fetchedProducts;

        if (categoryFilter) {
          // Si un filtre de catégorie est spécifié, utiliser la fonction de filtrage
          fetchedProducts = await getProductsByCategory(categoryFilter);
        } else {
          // Sinon, récupérer tous les produits
          fetchedProducts = await getAllProducts();
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryFilter]);

  // Désactiver la restauration de scroll native pour éviter tout conflit
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Sauvegarder la position de scroll AVANT toute navigation vers un article.
  // C'est la clé : on capture le clic en phase de capture (donc avant que Next.js
  // ne défile la page vers le haut), et on enregistre la position courante.
  // On combine avec un listener scroll throttle qui maintient la dernière position
  // connue dans une ref, au cas où.
  useEffect(() => {
    const key = `scroll-${pathname}`;
    let lastKnownY = window.scrollY;
    let throttleId = null;

    const onScroll = () => {
      if (throttleId !== null) return;
      throttleId = window.setTimeout(() => {
        lastKnownY = window.scrollY;
        throttleId = null;
      }, 80);
    };

    const persistFromEvent = (target) => {
      // On utilise scrollY si > 0, sinon la dernière valeur connue (au cas où
      // un autre script a déjà fait scrollTo(0, 0) juste avant le clic).
      const y = window.scrollY > 0 ? window.scrollY : lastKnownY;
      sessionStorage.setItem(key, String(y));
    };

    const onPointerDown = (e) => {
      // Sauvegarder dès qu'on clique sur un lien vers /produit/*
      const anchor = e.target?.closest?.("a");
      if (!anchor) return;
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.pathname.startsWith("/produit/")) {
          persistFromEvent();
        }
      } catch {
        // ignore
      }
    };

    const persistAll = () => {
      const y = window.scrollY > 0 ? window.scrollY : lastKnownY;
      sessionStorage.setItem(key, String(y));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    window.addEventListener("beforeunload", persistAll);
    window.addEventListener("pagehide", persistAll);

    return () => {
      if (throttleId !== null) clearTimeout(throttleId);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
      window.removeEventListener("beforeunload", persistAll);
      window.removeEventListener("pagehide", persistAll);
    };
  }, [pathname]);

  // Restaurer la position de scroll après chargement des produits.
  // Plusieurs tentatives pour gagner la course contre Next.js qui défile en haut.
  useEffect(() => {
    if (loading || products.length === 0) return;

    const key = `scroll-${pathname}`;
    const savedY = sessionStorage.getItem(key);
    if (!savedY) return;

    const targetY = parseInt(savedY, 10);
    if (Number.isNaN(targetY) || targetY <= 0) return;

    const restore = () => window.scrollTo(0, targetY);

    restore();
    const r1 = requestAnimationFrame(() => {
      restore();
      requestAnimationFrame(restore);
    });
    const t1 = setTimeout(restore, 50);
    const t2 = setTimeout(restore, 150);
    const t3 = setTimeout(restore, 300);
    const t4 = setTimeout(() => {
      restore();
      // On supprime la clé une fois la restauration terminée pour qu'une
      // visite ultérieure "fraîche" reparte du haut.
      sessionStorage.removeItem(key);
    }, 500);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [loading, products.length, pathname]);

  // Filtre par recherche (titre + description + tags, insensible aux accents/casse)
  const normalizedQuery = normalizeForSearch(searchQuery);
  const filteredProducts = normalizedQuery
    ? products.filter((p) => {
        const haystack = [
          p.title,
          p.description,
          ...(Array.isArray(p.tags) ? p.tags : []),
        ]
          .map(normalizeForSearch)
          .join(" ");
        // On match dès qu'un des mots saisis apparaît (recherche tolérante)
        const terms = normalizedQuery.split(/\s+/).filter(Boolean);
        return terms.every((term) => haystack.includes(term));
      })
    : products;

  // Fonction de tri des produits (sur la liste filtrée pour éviter de réordonner
  // tous les produits si on a déjà filtré).
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseFloat(a.variants?.[0]?.price?.amount || 0) -
          parseFloat(b.variants?.[0]?.price?.amount || 0)
        );
      case "price-high":
        return (
          parseFloat(b.variants?.[0]?.price?.amount || 0) -
          parseFloat(a.variants?.[0]?.price?.amount || 0)
        );
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-soft via-creamy/20 to-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
              <div className="text-charcoal text-lg">
                Chargement de nos trésors balinais...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-soft via-creamy/20 to-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-rustic mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-rustic text-lg">{error}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-soft via-creamy/20 to-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 text-warm mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="font-serif text-3xl text-charcoal mb-4">
              Nouvelles Collections à Venir
            </h3>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Nos artisans balinais préparent avec soin de magnifiques pièces
              pour vous. Revenez bientôt pour découvrir nos dernières créations
              !
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-soft via-creamy/20 to-soft relative overflow-hidden">
      {/* Motifs décoratifs chaleureux */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-warm/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-creamy/20 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Barre de recherche - large, au-dessus des contrôles */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (ex : rotin, coquillage, palmier, boîte…)"
              className="w-full pl-12 pr-12 py-3.5 rounded-full bg-soft border border-charcoal/15 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all shadow-sm"
              aria-label="Rechercher un article"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal/40 hover:text-charcoal transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Contrôles d'affichage et tri */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-charcoal/10">
          <div className="mb-4 md:mb-0">
            <p className="text-charcoal/60 font-medium">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "article" : "articles"}
              {normalizedQuery
                ? ` correspond${sortedProducts.length === 1 ? "" : "ent"} à votre recherche`
                : ` disponible${sortedProducts.length > 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Sélecteur de tri */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-charcoal/70 font-medium">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-charcoal/20 rounded-xl px-4 py-2.5 text-sm bg-soft font-medium text-charcoal focus:ring-2 focus:ring-rustic focus:border-transparent transition-all duration-200 hover:border-rustic/50"
              >
                <option value="featured">Sélection</option>
                <option value="name">Nom (A-Z)</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>

            {/* Sélecteur de vue */}
            <div className="flex items-center gap-2 bg-creamy/50 rounded-xl p-1.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-soft shadow-md text-charcoal border border-creamy/60" 
                    : "text-charcoal/50 hover:text-charcoal/80"
                }`}
                title="Vue grille"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3v8h8V3H3zm10 0v8h8V3h-8zM3 13v8h8v-8H3zm10 0v8h8v-8h-8z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-soft shadow-md text-charcoal border border-creamy/60" 
                    : "text-charcoal/50 hover:text-charcoal/80"
                }`}
                title="Vue liste"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Aucun résultat de recherche */}
        {normalizedQuery && sortedProducts.length === 0 ? (
          <div className="text-center py-16 px-6 bg-gradient-to-br from-warm/15 to-creamy/25 rounded-3xl border border-charcoal/5">
            <div className="w-16 h-16 mx-auto mb-5 bg-soft rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-3">
              Aucun article trouvé
            </h3>
            <p className="text-charcoal/70 max-w-md mx-auto mb-6 leading-relaxed">
              Aucun résultat pour <strong>« {searchQuery} »</strong>. Essayez avec un autre mot-clé (rotin, bambou, coquillage, palmier, perles…).
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-2 bg-charcoal text-soft px-6 py-3 rounded-full font-medium hover:bg-warm transition-colors"
            >
              Effacer la recherche
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Message informatif si peu de produits (et pas de recherche en cours) */}
        {!normalizedQuery && products.length <= 3 && (
          <div className="mt-20 text-center p-12 bg-gradient-to-br from-warm/20 to-creamy/30 rounded-3xl border border-charcoal/5">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-charcoal to-rustic rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-4 tracking-wide">
                Plus de merveilles arrivent bientôt !
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                Nos artisans balinais travaillent actuellement sur de nouvelles
                pièces exceptionnelles. Revenez bientôt pour en découvrir plus.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
