import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export const metadata = {
  title: "Mentions légales — Bohemian House",
  description:
    "Mentions légales de Bohemian House — éditeur, hébergement, propriété intellectuelle, données personnelles.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <>
      <Navigation />
      <Cart />

      {/* Hero */}
      <section className="relative py-20 lg:py-24 bg-rustic overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-warm/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-creamy/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block text-soft/70 text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Informations légales
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-soft mb-6 tracking-wide">
            Mentions légales
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto" />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

            <p className="text-sm text-charcoal/70 italic leading-relaxed">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575
              du 21 juin 2004 pour la Confiance dans l&apos;économie numérique (L.C.E.N.),
              il est porté à la connaissance des utilisateurs du site les informations suivantes.
            </p>

            {/* 1. Éditeur */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">1. Éditeur du site</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-2">
                <p>
                  Le présent site, accessible à l&apos;adresse{" "}
                  <a href="https://bohemianhouse.fr" className="text-warm hover:underline" target="_blank" rel="noopener noreferrer">bohemianhouse.fr</a>,
                  est édité par&nbsp;:
                </p>
                <p><span className="font-medium text-charcoal">Sandra PENSADO EI</span>, entrepreneur individuel,
                  exerçant sous le nom commercial <span className="font-medium text-charcoal">COMPTOIR BOHEME</span>
                </p>
                <p><span className="font-medium text-charcoal">SIREN :</span> 977 570 852</p>
                <p><span className="font-medium text-charcoal">SIRET :</span> 977 570 852 00011</p>
                <p>
                  <span className="font-medium text-charcoal">Adresse :</span>{" "}
                  23 chemin des Patinières, 74100 Vétraz-Monthoux, France
                </p>
                <p>
                  <span className="font-medium text-charcoal">Email :</span>{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>
                </p>
                <p>
                  <span className="font-medium text-charcoal">Téléphone :</span>{" "}
                  <a href="tel:+33770222377" className="text-warm hover:underline">07 70 22 23 77</a>
                </p>
                <p className="pt-1 text-sm text-charcoal/70">
                  Le site bohemianhouse.fr est exploité sous l&apos;enseigne commerciale{" "}
                  <span className="font-medium text-charcoal">Bohemian House</span>.
                </p>
              </div>
            </div>

            {/* 2. Hébergement */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">2. Hébergement du site</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-2">
                <p><span className="font-medium text-charcoal">Hébergeur :</span> Vercel Inc.</p>
                <p>
                  <span className="font-medium text-charcoal">Adresse :</span>{" "}
                  440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </p>
                <p>
                  <span className="font-medium text-charcoal">Site web :</span>{" "}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-warm hover:underline">
                    vercel.com
                  </a>
                </p>
              </div>
            </div>

            {/* 3. Propriété intellectuelle */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">3. Propriété intellectuelle</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le site bohemianhouse.fr, exploité sous l&apos;enseigne Bohemian House, est édité par
                  Sandra PENSADO EI, entrepreneur individuel exerçant sous le nom commercial COMPTOIR BOHEME.
                </p>
                <p>
                  L&apos;ensemble du site bohemianhouse.fr, incluant notamment sa structure, ses textes,
                  photographies, images, logos, graphismes, vidéos, sons, icônes, ainsi que tout autre
                  élément le composant, est la propriété exclusive de Sandra PENSADO EI, exerçant sous
                  le nom commercial COMPTOIR BOHEME, sauf mention contraire ou contenus appartenant
                  à des partenaires, fournisseurs ou artisans.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation, exploitation
                  ou diffusion, totale ou partielle, par quelque procédé que ce soit, est interdite sans
                  autorisation écrite préalable.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l&apos;un quelconque de ses éléments est
                  susceptible de constituer une contrefaçon, sanctionnée par les articles L.335-2 et
                  suivants du Code de la propriété intellectuelle.
                </p>
              </div>
            </div>

            {/* 4. Données personnelles */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">4. Données personnelles</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Dans le cadre de l&apos;utilisation du site bohemianhouse.fr, des données personnelles
                  peuvent être collectées, notamment lors de l&apos;utilisation du formulaire de contact,
                  de la création d&apos;un compte client ou de la passation d&apos;une commande.
                </p>
                <p>
                  Le responsable du traitement des données est Sandra PENSADO EI, entrepreneur individuel
                  exerçant sous le nom commercial COMPTOIR BOHEME.
                </p>
                <p>
                  Les données collectées sont utilisées uniquement pour les finalités suivantes&nbsp;:
                  répondre aux demandes envoyées via le formulaire de contact, traiter et expédier les
                  commandes, assurer le suivi de la relation client, gérer le service après-vente et
                  respecter les obligations légales et comptables applicables.
                </p>
                <p>
                  Les données personnelles collectées ne sont jamais vendues à des tiers. Elles peuvent
                  toutefois être transmises à des prestataires strictement nécessaires au fonctionnement
                  du site et au traitement des commandes, notamment les prestataires de paiement, de
                  livraison, d&apos;hébergement ou de maintenance technique.
                </p>
                <p>
                  Les données sont conservées pendant une durée limitée, adaptée à la finalité du
                  traitement, et conformément aux obligations légales applicables.
                </p>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                  Informatique et Libertés modifiée, vous disposez d&apos;un droit d&apos;accès, de
                  rectification, d&apos;opposition, d&apos;effacement, de limitation du traitement et
                  de portabilité de vos données personnelles.
                </p>
                <p>
                  Pour exercer vos droits, vous pouvez contacter le responsable du traitement à
                  l&apos;adresse suivante&nbsp;:{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>.
                </p>
              </div>
            </div>

            {/* 5. Responsabilité */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">5. Responsabilité</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Sandra PENSADO EI, entrepreneur individuel exerçant sous le nom commercial COMPTOIR
                  BOHEME et exploitant le site Bohemian House, s&apos;efforce de fournir sur le site
                  bohemianhouse.fr des informations aussi précises et à jour que possible.
                </p>
                <p>
                  Toutefois, l&apos;éditeur ne saurait garantir l&apos;exactitude, l&apos;exhaustivité
                  ou l&apos;actualité des informations diffusées sur le site.
                </p>
                <p>
                  L&apos;éditeur ne pourra être tenu responsable des erreurs, omissions,
                  indisponibilités du site, interruptions temporaires, dysfonctionnements techniques,
                  ou de tout dommage direct ou indirect résultant de l&apos;accès au site ou de son
                  utilisation. L&apos;utilisateur est responsable de l&apos;utilisation qu&apos;il fait
                  des informations et contenus disponibles sur le site.
                </p>
              </div>
            </div>

            {/* 6. Droit applicable */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">6. Droit applicable</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige,
                  les parties s&apos;efforceront de rechercher une solution amiable avant toute action
                  judiciaire. À défaut de résolution amiable, le litige sera porté devant les
                  juridictions françaises compétentes, conformément aux règles de droit commun
                  applicables.
                </p>
              </div>
            </div>

            {/* 7. Liens hypertextes */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">7. Liens hypertextes</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le site bohemianhouse.fr peut contenir des liens hypertextes vers des sites tiers.
                  Sandra PENSADO ne peut exercer aucun contrôle sur le contenu de ces sites externes
                  et décline toute responsabilité quant à leur contenu, leur fonctionnement ou leur
                  politique de confidentialité. La présence de liens vers des sites tiers ne constitue
                  pas une approbation de leur contenu.
                </p>
              </div>
            </div>

            {/* 8. Contact */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">8. Contact</h2>
              <p className="text-charcoal/85 leading-relaxed">
                Pour toute question relative aux présentes mentions légales, l&apos;utilisateur peut
                contacter l&apos;éditeur du site à l&apos;adresse suivante&nbsp;:{" "}
                <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                  contact@bohemianhouse.fr
                </a>.
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
