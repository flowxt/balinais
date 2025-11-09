import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="Bohemian House"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-serif text-xl font-semibold">
                Bohemian House
              </span>
            </div>
            <p className="text-creamy leading-relaxed">
              Spécialiste du mobilier balinais authentique, nous créons des
              espaces uniques qui reflètent votre personnalité.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-creamy hover:text-soft transition-colors duration-200"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-creamy hover:text-soft transition-colors duration-200"
                >
                  Nos Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-creamy hover:text-soft transition-colors duration-200"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-creamy hover:text-soft transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-creamy">
              <p>Email: contact@bohemianhouse.fr</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
              <p>Showroom sur rendez-vous</p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="border-t border-rustic mt-12 pt-8 text-center">
          <p className="text-creamy">
            © 2024 Bohemian House. Tous droits réservés. | Meubles balinais
            authentiques
          </p>
        </div>
      </div>
    </footer>
  );
}
 