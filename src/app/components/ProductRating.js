"use client";

import { useState, useEffect } from "react";
import StarRating from "./StarRating";

export default function ProductRating({ productId, size = "sm" }) {
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchRating() {
      try {
        const response = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
        if (response.ok) {
          const data = await response.json();
          setRating(data.rating || 0);
          setCount(data.count || 0);
        }
      } catch (error) {
        // Silencieusement ignorer les erreurs pour ne pas bloquer l'affichage
      } finally {
        setLoaded(true);
      }
    }

    if (productId) {
      fetchRating();
    }
  }, [productId]);

  // Ne rien afficher si pas encore chargé ou pas d'avis
  if (!loaded || count === 0) {
    return null;
  }

  return <StarRating rating={rating} count={count} size={size} />;
}
