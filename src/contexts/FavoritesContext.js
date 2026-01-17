"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customer, isAuthenticated } = useAuth();

  // Charger les favoris au démarrage et quand l'utilisateur change
  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated, customer]);

  const loadFavorites = async () => {
    try {
      // Toujours charger les favoris locaux d'abord
      const localFavorites = typeof window !== "undefined" 
        ? JSON.parse(localStorage.getItem("bohemian_favorites") || "[]")
        : [];
      
      if (isAuthenticated) {
        // Si connecté, synchroniser avec le serveur
        const token = localStorage.getItem("customerAccessToken");
        try {
          const response = await fetch("/api/favorites", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            const serverFavorites = data.favorites || [];
            
            // Fusionner les favoris locaux et serveur (sans doublons)
            const mergedFavorites = [...new Set([...localFavorites, ...serverFavorites])];
            setFavorites(mergedFavorites);
            
            // Sauvegarder la fusion sur le serveur si nécessaire
            if (localFavorites.length > 0 && mergedFavorites.length > serverFavorites.length) {
              await syncFavoritesToServer(mergedFavorites, token);
            }
            // Nettoyer le localStorage une fois synchronisé
            localStorage.removeItem("bohemian_favorites");
          } else {
            setFavorites(localFavorites);
          }
        } catch {
          setFavorites(localFavorites);
        }
      } else {
        setFavorites(localFavorites);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des favoris:", err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const syncFavoritesToServer = async (favoritesToSync, token) => {
    try {
      await fetch("/api/favorites/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favorites: favoritesToSync }),
      });
    } catch (err) {
      console.error("Erreur lors de la synchronisation des favoris:", err);
    }
  };

  const saveFavoritesLocal = (newFavorites) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bohemian_favorites", JSON.stringify(newFavorites));
    }
  };

  const addFavorite = async (productId) => {
    if (favorites.includes(productId)) return;
    
    const newFavorites = [...favorites, productId];
    setFavorites(newFavorites);

    if (isAuthenticated) {
      // Sauvegarder sur le serveur
      try {
        const token = localStorage.getItem("customerAccessToken");
        await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
      } catch (err) {
        console.error("Erreur lors de l'ajout aux favoris:", err);
      }
    } else {
      // Sauvegarder localement
      saveFavoritesLocal(newFavorites);
    }
  };

  const removeFavorite = async (productId) => {
    const newFavorites = favorites.filter((id) => id !== productId);
    setFavorites(newFavorites);

    if (isAuthenticated) {
      // Supprimer sur le serveur
      try {
        const token = localStorage.getItem("customerAccessToken");
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
      } catch (err) {
        console.error("Erreur lors de la suppression des favoris:", err);
      }
    } else {
      // Sauvegarder localement
      saveFavoritesLocal(newFavorites);
    }
  };

  const toggleFavorite = async (productId) => {
    if (favorites.includes(productId)) {
      await removeFavorite(productId);
    } else {
      await addFavorite(productId);
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  }
  return context;
}
