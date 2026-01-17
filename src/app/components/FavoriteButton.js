"use client";

import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoriteButton({ productId, className = "" }) {
  const { isFavorite, toggleFavorite, loading } = useFavorites();
  const isLiked = isFavorite(productId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(productId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`group/fav p-2.5 rounded-full transition-all duration-300 ${
        isLiked
          ? "bg-warm/90 text-white shadow-lg shadow-warm/30"
          : "bg-white/90 text-charcoal/50 hover:bg-white hover:text-warm hover:shadow-md"
      } backdrop-blur-sm disabled:opacity-50 ${className}`}
      aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${
          isLiked ? "scale-110" : "group-hover/fav:scale-110"
        }`}
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isLiked ? 0 : 1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
