"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Navigation() {
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="bg-soft/80 backdrop-blur-sm sticky top-0 z-50 border-b border-creamy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Bohemian House Logo"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div className="font-serif text-xl font-semibold text-charcoal">
                Bohemian House
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-charcoal hover:text-rustic transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/collections"
              className="text-charcoal hover:text-rustic transition-colors duration-200 font-medium"
            >
              Nos Articles
            </Link>
            <Link
              href="/a-propos"
              className="text-charcoal hover:text-rustic transition-colors duration-200 font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-charcoal hover:text-rustic transition-colors duration-200 font-medium"
            >
              Contact
            </Link>

            {/* Icône du panier */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-charcoal hover:text-rustic transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rustic text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-charcoal hover:text-rustic p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
