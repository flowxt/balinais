"use client";

import { useEffect } from "react";
import Script from "next/script";

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function JudgemeWidget({ productId, productTitle, productUrl }) {
  // Extraire l'ID numérique
  const numericId = productId?.replace("gid://shopify/Product/", "") || "";

  useEffect(() => {
    // Réinitialiser les widgets Judge.me quand le produit change
    if (typeof window !== "undefined" && window.jdgm && typeof window.jdgm.init === "function") {
      window.jdgm.init();
    }
  }, [productId]);

  return (
    <>
      {/* Script Judge.me */}
      <Script
        src={`https://cdn.judge.me/widget_preloader.js`}
        strategy="afterInteractive"
      />
      <Script
        src={`https://cdn.judge.me/assets/installed.js`}
        strategy="afterInteractive"
        data-shop-domain={SHOP_DOMAIN}
      />

      {/* Widget des avis */}
      <div
        className="jdgm-widget jdgm-review-widget"
        data-id={numericId}
        data-product-title={productTitle}
        data-product-url={productUrl || `/produit/${numericId}`}
      />
    </>
  );
}

// Widget compact pour les étoiles seulement (cartes produits)
export function JudgemePreviewBadge({ productId }) {
  const numericId = productId?.replace("gid://shopify/Product/", "") || "";

  return (
    <div
      className="jdgm-widget jdgm-preview-badge"
      data-id={numericId}
    />
  );
}
