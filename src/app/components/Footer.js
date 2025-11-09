import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-charcoal to-charcoal/95 text-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <Image
                src="/images/logo.png"
                alt="Bohemian House"
                width={48}
                height={48}
                className="w-12 h-12 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-serif text-2xl font-light tracking-wide">
                Bohemian House
              </span>
            </Link>
            <p className="text-creamy/80 leading-relaxed text-sm">
              Mobilier balinais authentique pour créer des espaces uniques et inspirants.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-rustic/20 hover:bg-rustic flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-rustic/20 hover:bg-rustic flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-warm">Navigation</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-creamy/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-creamy/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Nos Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-creamy/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-creamy/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-warm">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-creamy/80 group">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-rustic group-hover:text-warm transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@bohemianhouse.fr" className="hover:text-soft transition-colors">
                  contact@bohemianhouse.fr
                </a>
              </li>
              <li className="flex items-start gap-3 text-creamy/80 group">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-rustic group-hover:text-warm transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0772776090" className="hover:text-soft transition-colors">
                  07 72 77 60 90
                </a>
              </li>
              <li className="flex items-start gap-3 text-creamy/80 group">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-rustic group-hover:text-warm transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Showroom sur rendez-vous</span>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-warm">Informations</h3>
            <ul className="space-y-3 text-sm text-creamy/80">
              <li>
                <span className="block font-medium text-creamy mb-1">SIRET</span>
                <span className="text-xs">97757085200011</span>
              </li>
              <li className="pt-2">
                <Link href="/mentions-legales" className="hover:text-soft transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-soft transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 rounded-full bg-rustic mr-2 group-hover:w-2 transition-all duration-200"></span>
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-rustic/50 to-transparent flex-1"></div>
          <div className="mx-4 w-2 h-2 bg-rustic/50 rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-rustic/50 to-transparent flex-1"></div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-creamy/60 text-sm">
            © {currentYear} Bohemian House. Tous droits réservés. Mobilier balinais authentique.
          </p>
        </div>
      </div>
    </footer>
  );
}
 