"use client";

import { useState, useEffect } from "react";

// Clé de session : la modale ne se réaffiche pas à chaque navigation,
// mais réapparaît si le visiteur revient plus tard (nouvel onglet/session).
const STORAGE_KEY = "summer-closure-dismissed-2026";

export default function SummerClosureModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        // Petit délai pour laisser la page s'afficher avant la modale.
        const timer = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Bloque le scroll de la page tant que la modale est ouverte.
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summer-closure-title"
    >
      {/* Backdrop flouté */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* Carte */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-soft via-creamy/40 to-soft rounded-3xl shadow-2xl shadow-charcoal/30 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Halo décoratif */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-warm/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        </div>

        {/* Bouton fermer */}
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative px-8 py-10 text-center">
          {/* Icône soleil */}
          <div className="w-16 h-16 mx-auto mb-6 bg-rustic rounded-2xl flex items-center justify-center shadow-lg shadow-charcoal/15">
            <svg className="w-8 h-8 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <h2
            id="summer-closure-title"
            className="font-serif text-2xl md:text-3xl text-charcoal mb-2 tracking-wide"
          >
            Fermeture estivale
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mb-6"></div>

          <p className="text-charcoal/85 leading-relaxed mb-4">
            Bohemian House fait une pause pour l&apos;été&nbsp;! Vous pouvez continuer
            à parcourir la boutique et passer commande, mais les commandes ne seront{" "}
            <strong className="font-semibold text-charcoal">
              traitées et expédiées qu&apos;à partir de courant septembre
            </strong>
            .
          </p>
          <p className="text-charcoal/70 text-sm leading-relaxed mb-8">
            Merci pour votre confiance et votre patience. Nous avons hâte de vous
            retrouver&nbsp;!
          </p>

          <button
            onClick={close}
            className="w-full bg-charcoal text-soft py-3.5 px-6 rounded-xl font-medium hover:bg-rustic transition-colors duration-300 shadow-lg shadow-charcoal/20"
          >
            J&apos;ai compris
          </button>
        </div>
      </div>
    </div>
  );
}
