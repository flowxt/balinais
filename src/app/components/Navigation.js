"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Navigation() {
  const { toggleCart, getTotalItems } = useCart();
  const { isAuthenticated, customer } = useAuth();
  const { favoritesCount } = useFavorites();
  const totalItems = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-soft/95 via-creamy/90 to-soft/95 backdrop-blur-md sticky top-0 z-50 border-b border-warm/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Bohemian House Logo"
                  width={48}
                  height={48}
                  className="w-11 h-11 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl text-charcoal tracking-wide block leading-tight">
                  Bohemian House
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40">
                  Artisanat de Bali
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-charcoal/70 hover:text-charcoal transition-colors duration-200 text-sm font-medium group"
            >
              Accueil
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/collections"
              className="relative px-4 py-2 text-charcoal/70 hover:text-charcoal transition-colors duration-200 text-sm font-medium group"
            >
              Boutique
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/a-propos"
              className="relative px-4 py-2 text-charcoal/70 hover:text-charcoal transition-colors duration-200 text-sm font-medium group"
            >
              À propos
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/contact"
              className="relative px-4 py-2 text-charcoal/70 hover:text-charcoal transition-colors duration-200 text-sm font-medium group"
            >
              Contact
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {/* Séparateur vertical */}
            <div className="w-px h-6 bg-charcoal/10 mx-2"></div>

            {/* Icône Favoris */}
            <Link
              href={isAuthenticated ? "/compte/favoris" : "/connexion"}
              className="relative p-2.5 text-charcoal/60 hover:text-warm transition-colors duration-200 rounded-full hover:bg-warm/10"
              title="Mes favoris"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-warm text-charcoal text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Icône Compte */}
            <Link
              href={isAuthenticated ? "/compte" : "/connexion"}
              className="relative p-2.5 text-charcoal/60 hover:text-charcoal transition-colors duration-200 rounded-full hover:bg-warm/10 group"
              title={isAuthenticated ? `Bonjour ${customer?.firstName || ""}` : "Se connecter"}
            >
              {isAuthenticated ? (
                <div className="w-5 h-5 bg-warm rounded-full flex items-center justify-center text-[10px] font-semibold text-charcoal">
                  {customer?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </Link>

            {/* Icône du panier */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-charcoal/60 hover:text-charcoal transition-colors duration-200 rounded-full hover:bg-warm/10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-warm text-charcoal text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Icons + Menu button */}
          <div className="md:hidden flex items-center gap-1">
            {/* Favoris mobile */}
            <Link
              href={isAuthenticated ? "/compte/favoris" : "/connexion"}
              className="relative p-2 text-charcoal/60 hover:text-warm transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-warm text-charcoal text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Compte mobile */}
            <Link
              href={isAuthenticated ? "/compte" : "/connexion"}
              className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors"
            >
              {isAuthenticated ? (
                <div className="w-5 h-5 bg-warm rounded-full flex items-center justify-center text-[10px] font-semibold text-charcoal">
                  {customer?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </Link>

            {/* Panier mobile */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-warm text-charcoal text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Bouton menu hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-charcoal/70 hover:text-charcoal p-2 rounded-lg hover:bg-charcoal/5 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-charcoal/5 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal/70 hover:text-charcoal hover:bg-warm/5 rounded-lg transition-colors text-sm font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal/70 hover:text-charcoal hover:bg-warm/5 rounded-lg transition-colors text-sm font-medium"
            >
              Boutique
            </Link>
            <Link
              href="/a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal/70 hover:text-charcoal hover:bg-warm/5 rounded-lg transition-colors text-sm font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal/70 hover:text-charcoal hover:bg-warm/5 rounded-lg transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            
            {/* Séparateur */}
            <div className="h-px bg-charcoal/5 my-2"></div>
            
            {/* Compte */}
            <Link
              href={isAuthenticated ? "/compte" : "/connexion"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-charcoal/70 hover:text-charcoal hover:bg-warm/5 rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {isAuthenticated ? `Mon compte (${customer?.firstName || ""})` : "Se connecter"}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
