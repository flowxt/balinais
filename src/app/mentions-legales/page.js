import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export const metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de Bohemian House — informations sur l'éditeur du site, l'hébergeur et la propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <>
      <Navigation />
      <Cart />

      {/* Hero */}
      <section className="relative py-20 lg:py-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-warm/70 text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Informations légales
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-soft mb-6 tracking-wide">
            Mentions légales
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto" />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-charcoal/60 hover:text-charcoal transition-colors">
            Accueil
          </Link>
          <span className="text-charcoal/40">/</span>
          <span className="text-charcoal font-medium">Mentions légales</span>
        </nav>
      </div>

      {/* Contenu */}
      <section className="py-16 bg-gradient-to-b from-soft via-creamy/25 to-soft relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-warm/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-creamy/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-gradient-to-br from-creamy/40 to-soft rounded-3xl p-8 md:p-12 shadow-lg shadow-charcoal/10 border border-creamy/60 space-y-10">

            <p className="text-sm text-charcoal/70 italic">
              Conformément aux dispositions des articles 6-III et 19 de la Loi
              n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie
              numérique, dite L.C.E.N., il est porté à la connaissance des
              utilisateurs du site les informations suivantes.
            </p>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                1. Éditeur du site
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-2">
                <p><span className="font-medium text-charcoal">Nom commercial :</span> Bohemian House</p>
                <p><span className="font-medium text-charcoal">Responsable de la publication :</span> Sandra</p>
                <p><span className="font-medium text-charcoal">SIRET :</span> 977 570 852 00011</p>
                <p>
                  <span className="font-medium text-charcoal">Email :</span>{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>
                </p>
                <p>
                  <span className="font-medium text-charcoal">Téléphone :</span>{" "}
                  <a href="tel:+33772776090" className="text-warm hover:underline">
                    07 72 77 60 90
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                2. Hébergement du site
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-2">
                <p><span className="font-medium text-charcoal">Hébergeur :</span> Vercel Inc.</p>
                <p>
                  <span className="font-medium text-charcoal">Adresse :</span> 440 N Barranca Ave #4133,
                  Covina, CA 91723, États-Unis
                </p>
                <p>
                  <span className="font-medium text-charcoal">Site web :</span>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                3. Propriété intellectuelle
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  L&apos;ensemble du site (structure, textes, photographies,
                  images, logos, sons, vidéos, charte graphique, etc.) est la
                  propriété exclusive de Bohemian House ou de ses partenaires
                  artisans. Toute reproduction, représentation, modification,
                  publication, adaptation, totale ou partielle, par quelque
                  procédé que ce soit, est interdite sans autorisation écrite
                  préalable.
                </p>
                <p>
                  Toute exploitation non autorisée est susceptible de constituer
                  une contrefaçon, sanctionnée par les articles L.335-2 et
                  suivants du Code de la propriété intellectuelle.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                4. Données personnelles
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les informations recueillies via les formulaires de contact ou
                  lors d&apos;une commande sont utilisées uniquement pour
                  répondre à vos demandes et traiter vos commandes. Elles ne
                  sont jamais cédées à des tiers à des fins commerciales.
                </p>
                <p>
                  Conformément au Règlement Général sur la Protection des
                  Données (RGPD) et à la loi Informatique et Libertés modifiée,
                  vous disposez d&apos;un droit d&apos;accès, de rectification,
                  d&apos;opposition et de suppression des données vous
                  concernant. Pour exercer ce droit, contactez-nous à{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                5. Cookies
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Le site peut être amené à utiliser des cookies à des fins
                strictement nécessaires à son bon fonctionnement (panier,
                session utilisateur) ou à des fins de mesure d&apos;audience.
                Vous pouvez à tout moment configurer votre navigateur pour
                refuser les cookies.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                6. Responsabilité
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Bohemian House s&apos;efforce de fournir sur ce site des
                informations aussi précises que possible. Toutefois, l&apos;éditeur
                ne pourra être tenu responsable des omissions, inexactitudes,
                ni des dommages directs ou indirects résultant de l&apos;accès
                au site ou de son utilisation.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                7. Droit applicable
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, les tribunaux français seront seuls
                compétents.
              </p>
            </div>

            <p className="text-xs text-charcoal/55 italic pt-4 border-t border-charcoal/10">
              Dernière mise à jour : mai 2026.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
