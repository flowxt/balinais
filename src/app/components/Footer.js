import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rustic text-soft relative overflow-hidden">
      {/* Motif décoratif subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-warm rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-creamy rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo et description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <Image
                src="/images/logo-sansfond.png"
                alt="Bohemian House"
                width={80}
                height={80}
                className="w-16 h-16 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="font-serif text-2xl font-light tracking-wide block">
                  Bohemian House
                </span>
              </div>
            </Link>
            <p className="text-soft/70 leading-relaxed text-sm max-w-xs">
              Créations artisanales authentiques de Bali pour sublimer votre intérieur avec élégance et sérénité.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-warm mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-soft/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-soft/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-soft/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-soft/80 hover:text-soft transition-colors duration-200 text-sm inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-warm mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:contact@bohemianhouse.fr" className="text-soft/80 hover:text-soft transition-colors flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-soft/10 flex items-center justify-center group-hover:bg-warm/30 transition-colors">
                    <svg className="w-4 h-4 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  contact@bohemianhouse.fr
                </a>
              </li>
              <li>
                <a href="tel:0770222377" className="text-soft/80 hover:text-soft transition-colors flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-soft/10 flex items-center justify-center group-hover:bg-warm/30 transition-colors">
                    <svg className="w-4 h-4 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  07 70 22 23 77
                </a>
              </li>
              <li className="flex items-center gap-3 text-soft/60">
                <div className="w-8 h-8 rounded-lg bg-soft/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-warm/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                Boutique 100% en ligne
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-warm mb-6">Informations</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-soft/60 text-xs uppercase tracking-wider mb-1">SIRET</div>
                <span className="text-soft/80">97757085200011</span>
              </li>
              <li className="pt-2 space-y-3">
                <Link href="/mentions-legales" className="text-soft/80 hover:text-soft transition-colors inline-flex items-center group">
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Mentions légales
                </Link>
                <br />
                <Link href="/cgv" className="text-soft/80 hover:text-soft transition-colors inline-flex items-center group">
                  <span className="w-0 group-hover:w-3 h-px bg-warm mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Conditions générales de vente
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-soft/20 to-transparent flex-1"></div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-soft/60 text-xs">
            © {currentYear} Bohemian House. Tous droits réservés.
          </p>
          <p className="text-soft/50 text-xs">
            Artisanat balinais authentique • Fait main avec passion
          </p>
        </div>
      </div>
    </footer>
  );
}
