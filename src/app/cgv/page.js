import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export const metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions Générales de Vente de Bohemian House — commandes, livraisons, paiement, rétractation et garanties.",
  alternates: { canonical: "/cgv" },
};

export default function CGV() {
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
            Boutique en ligne
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-soft mb-6 tracking-wide">
            Conditions générales de vente
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
          <span className="text-charcoal font-medium">CGV</span>
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
              Les présentes Conditions Générales de Vente (ci-après «&nbsp;CGV&nbsp;»)
              s&apos;appliquent à toutes les commandes passées sur le site
              bohemianhouse.fr. Toute commande implique l&apos;acceptation
              entière et sans réserve des présentes CGV.
            </p>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 1 — Objet
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Les présentes CGV ont pour objet de définir les droits et
                obligations des parties dans le cadre de la vente en ligne de
                produits de décoration et d&apos;ameublement artisanaux
                proposés par Bohemian House (le «&nbsp;Vendeur&nbsp;») à tout
                consommateur (le «&nbsp;Client&nbsp;»).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 2 — Produits
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les produits proposés à la vente sont ceux figurant sur le
                  site au jour de la consultation par le Client, dans la limite
                  des stocks disponibles. Chaque produit fait l&apos;objet
                  d&apos;une description et d&apos;une photographie.
                </p>
                <p>
                  Nos articles étant fabriqués à la main par des artisans
                  balinais, de légères variations de couleur, de texture ou de
                  dimensions peuvent exister entre la photographie et le produit
                  livré. Ces variations font partie intégrante du caractère
                  authentique et unique de chaque pièce.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 3 — Prix
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Les prix des produits sont indiqués en euros, toutes taxes
                comprises (TTC), hors frais de livraison. Les frais de livraison
                sont précisés avant la validation définitive de la commande.
                Bohemian House se réserve le droit de modifier ses prix à tout
                moment ; les produits seront facturés sur la base des tarifs en
                vigueur au moment de l&apos;enregistrement de la commande.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 4 — Commande
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le Client passe commande directement sur le site. La commande
                  ne sera définitivement validée qu&apos;après confirmation
                  du paiement. Un email récapitulatif sera envoyé au Client à
                  l&apos;adresse renseignée.
                </p>
                <p>
                  Bohemian House se réserve le droit d&apos;annuler ou de
                  refuser toute commande émanant d&apos;un Client avec lequel
                  existerait un litige relatif au paiement d&apos;une
                  commande antérieure.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 5 — Paiement
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Le paiement s&apos;effectue en ligne par carte bancaire via un
                prestataire de paiement sécurisé. Les données bancaires
                transitent de manière chiffrée et ne sont à aucun moment
                conservées par Bohemian House. La commande est expédiée
                uniquement après réception complète du paiement.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 6 — Livraison
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les produits sont livrés à l&apos;adresse indiquée par le
                  Client lors de la commande, en France métropolitaine. Les
                  délais de livraison sont communiqués à titre indicatif ; ils
                  varient selon la disponibilité du produit et le transporteur
                  choisi.
                </p>
                <p>
                  En cas de retard de livraison de plus de 30 jours, le Client
                  pourra annuler sa commande et obtenir le remboursement des
                  sommes versées. Pour les pièces volumineuses (mobilier), un
                  devis personnalisé peut être proposé.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 7 — Droit de rétractation
              </h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Conformément aux articles L.221-18 et suivants du Code de la
                  consommation, le Client dispose d&apos;un délai de{" "}
                  <span className="font-medium text-charcoal">14 jours</span>{" "}
                  à compter de la réception du produit pour exercer son droit
                  de rétractation, sans avoir à motiver sa décision.
                </p>
                <p>
                  La demande doit être adressée par email à{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>. Le produit doit être retourné dans son emballage
                  d&apos;origine, en parfait état, à la charge du Client. Le
                  remboursement intervient dans les 14 jours suivant la
                  réception du produit retourné.
                </p>
                <p className="text-sm text-charcoal/75 italic">
                  Le droit de rétractation ne s&apos;applique pas aux produits
                  confectionnés sur mesure ou personnalisés à la demande du
                  Client (article L.221-28 du Code de la consommation).
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 8 — Garanties
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Tous les produits bénéficient de la garantie légale de
                conformité (articles L.217-4 et suivants du Code de la
                consommation) et de la garantie contre les vices cachés
                (articles 1641 et suivants du Code civil). En cas de
                non-conformité ou de défaut, le Client peut contacter
                Bohemian House à l&apos;adresse{" "}
                <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                  contact@bohemianhouse.fr
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 9 — Responsabilité
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Bohemian House ne saurait être tenue pour responsable de
                l&apos;inexécution du contrat en cas de force majeure, de
                perturbation ou grève totale ou partielle des services postaux
                et moyens de transport, ou de toute cause indépendante de sa
                volonté.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 10 — Données personnelles
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Les informations collectées sont nécessaires au traitement de
                la commande. Conformément au RGPD, le Client dispose d&apos;un
                droit d&apos;accès, de rectification, d&apos;opposition et de
                suppression de ses données. Pour exercer ce droit, contactez{" "}
                <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                  contact@bohemianhouse.fr
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Article 11 — Litiges
              </h2>
              <p className="text-charcoal/85 leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de
                litige, le Client est invité à se rapprocher dans un premier
                temps de Bohemian House afin de rechercher une solution amiable.
                À défaut, le Client peut recourir gratuitement au médiateur de
                la consommation ou saisir la juridiction compétente.
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
