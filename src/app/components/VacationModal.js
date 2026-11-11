"use client";

import { useEffect, useState } from "react";

const RESUME_DATE = new Date("2026-11-22T00:00:00+01:00");
const STORAGE_KEY = "bh-vacation-modal-2026-dismissed";

export default function VacationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (new Date() >= RESUME_DATE) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vacation-modal-title"
    >
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-soft rounded-2xl shadow-2xl shadow-charcoal/30 border border-creamy">
        <div className="h-1.5 bg-gradient-to-r from-warm via-golden to-rustic" />

        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-creamy/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
          <div className="mx-auto mb-4 sm:mb-6 w-14 h-14 rounded-full bg-creamy/60 flex items-center justify-center text-rustic">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-rustic mb-3">
            Information expéditions
          </p>
          <h2
            id="vacation-modal-title"
            className="font-serif text-3xl font-light text-charcoal mb-5 tracking-wide"
          >
            Bohemian House est en congés
          </h2>

          <p className="text-charcoal/80 leading-relaxed mb-4">
            Nous prenons quelques jours de repos. Vous pouvez continuer à passer commande
            sur le site : vos commandes seront préparées et expédiées dès notre retour.
          </p>

          <div className="my-4 sm:my-6 inline-block rounded-xl bg-creamy/40 border border-creamy px-6 py-3">
            <p className="text-sm text-charcoal/70">Reprise des envois le</p>
            <p className="font-serif text-2xl text-charcoal">22 novembre 2026</p>
          </div>

          <p className="text-sm text-charcoal/70 leading-relaxed mb-6 sm:mb-8">
            Merci pour votre compréhension et votre confiance. Pour toute question :{" "}
            <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
              contact@bohemianhouse.fr
            </a>
          </p>

          <button
            onClick={close}
            className="w-full sm:w-auto px-10 py-3 rounded-full bg-rustic text-soft font-medium tracking-wide hover:bg-charcoal transition-colors duration-300"
          >
            J&apos;ai compris
          </button>
        </div>
      </div>
    </div>
  );
}
