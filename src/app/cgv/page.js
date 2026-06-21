import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export const metadata = {
  title: "Conditions Générales de Vente — Bohemian House",
  description:
    "Conditions Générales de Vente de Bohemian House — commandes, livraisons, paiement, rétractation et garanties légales.",
  alternates: { canonical: "/cgv" },
};

export default function CGV() {
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
            Boutique en ligne
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-soft mb-6 tracking-wide">
            Conditions générales de vente
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

            <p className="text-sm text-charcoal/70 italic leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent l&apos;ensemble
              des ventes conclues entre Sandra PENSADO EI, exerçant sous le nom commercial
              COMPTOIR BOHEME et exploitant le site bohemianhouse.fr sous l&apos;enseigne
              Bohemian House, et tout consommateur (le « Client ») passant commande sur
              le site bohemianhouse.fr. Toute commande implique l&apos;acceptation pleine et
              entière des présentes CGV.
            </p>

            {/* Article 1 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 1 — Objet</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les présentes CGV ont pour objet de définir les droits et obligations de
                  Sandra PENSADO EI (ci-après le « Vendeur ») et de tout Client dans le cadre
                  de la vente en ligne d&apos;articles artisanaux de décoration, d&apos;accessoires
                  et d&apos;objets pour la maison proposés sur le site bohemianhouse.fr.
                </p>
                <p>
                  Les présentes CGV s&apos;appliquent à toutes les commandes passées sur le site
                  bohemianhouse.fr. Toute commande passée implique l&apos;acceptation pleine et
                  entière, sans réserve, des présentes CGV par le Client.
                </p>
              </div>
            </div>

            {/* Article 2 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 2 — Produits</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les produits proposés à la vente sont ceux figurant sur le site bohemianhouse.fr
                  au jour de la consultation par le Client, dans la limite des stocks disponibles.
                  Chaque produit fait l&apos;objet d&apos;une fiche descriptive présentant ses
                  caractéristiques essentielles, accompagnée, le cas échéant, d&apos;une ou plusieurs
                  photographies.
                </p>
                <p>
                  Les articles proposés sont fabriqués à la main par des artisans balinais. En raison
                  de leur caractère artisanal, de légères variations de couleur, de texture, de forme,
                  de finition ou de dimensions peuvent exister entre les photographies présentées sur
                  le site et le produit livré. Ces variations ne constituent pas un défaut de conformité
                  dès lors qu&apos;elles n&apos;altèrent pas les caractéristiques essentielles du produit.
                  Elles font partie intégrante du caractère authentique, unique et artisanal de chaque pièce.
                </p>
              </div>
            </div>

            {/* Article 3 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 3 — Prix</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les prix des produits sont indiqués en euros (€), hors frais de livraison.
                  TVA non applicable, article 293 B du Code général des impôts.
                </p>
                <p>
                  Les frais de livraison sont précisés avant la validation définitive de la commande.
                  Sandra PENSADO EI se réserve le droit de modifier ses prix à tout moment. Toutefois,
                  les produits seront facturés sur la base des tarifs en vigueur au moment de
                  l&apos;enregistrement de la commande, sous réserve de disponibilité.
                </p>
              </div>
            </div>

            {/* Article 4 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 4 — Commande</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le Client passe commande directement sur le site bohemianhouse.fr. Avant la
                  validation de sa commande, le Client peut vérifier le détail de sa commande,
                  son prix total, les frais de livraison applicables, ainsi que les informations
                  renseignées, et corriger d&apos;éventuelles erreurs.
                </p>
                <p>
                  La commande ne sera définitivement validée qu&apos;après acceptation des présentes
                  CGV et confirmation du paiement. Un email récapitulatif de commande sera envoyé
                  au Client à l&apos;adresse email renseignée lors de la commande.
                </p>
                <p>
                  Sandra PENSADO EI se réserve le droit d&apos;annuler ou de refuser toute commande
                  émanant d&apos;un Client avec lequel existerait un litige relatif au paiement
                  d&apos;une commande antérieure, ou en cas de suspicion de fraude, d&apos;erreur
                  manifeste sur le prix ou d&apos;indisponibilité du produit.
                </p>
              </div>
            </div>

            {/* Article 5 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 5 — Paiement</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le paiement s&apos;effectue en ligne via un prestataire de paiement sécurisé.
                  Les moyens de paiement proposés sur le site peuvent inclure notamment la carte
                  bancaire, PayPal et Klarna, selon les options disponibles au moment de la commande.
                </p>
                <p>
                  Le paiement est exigible immédiatement au moment de la commande, sauf option de
                  paiement différé ou fractionné proposée par un prestataire tel que Klarna, selon
                  les conditions propres à ce prestataire.
                </p>
                <p>
                  Les données bancaires du Client sont traitées de manière sécurisée par les
                  prestataires de paiement concernés et ne sont à aucun moment conservées par
                  Sandra PENSADO EI. La commande ne sera préparée et expédiée qu&apos;après
                  validation complète du paiement.
                </p>
              </div>
            </div>

            {/* Article 6 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 6 — Livraison</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les produits sont livrés à l&apos;adresse indiquée par le Client lors de la commande.
                  La livraison est proposée en France métropolitaine. Des livraisons vers d&apos;autres
                  destinations peuvent être proposées le cas échéant, selon les options disponibles
                  sur le site au moment de la commande.
                </p>
                <p>
                  Les frais et délais de livraison sont indiqués au Client avant la validation
                  définitive de la commande. Sandra PENSADO EI s&apos;engage à expédier la commande
                  dans les meilleurs délais après validation du paiement, sous réserve de disponibilité
                  des produits. Sauf indication contraire, la livraison interviendra au plus tard dans
                  un délai de trente (30) jours à compter de la validation de la commande.
                </p>
                <p>
                  En cas de retard de livraison, le Client est invité à contacter le Vendeur
                  à l&apos;adresse{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>.
                  Si la livraison n&apos;est pas intervenue dans le délai légal de trente (30) jours,
                  le Client pourra demander la résolution de la vente dans les conditions prévues par
                  le Code de la consommation. Sandra PENSADO EI procédera alors au remboursement des
                  sommes versées dans un délai de quatorze (14) jours.
                </p>
                <p>
                  Pour les pièces volumineuses ou nécessitant des modalités particulières de transport,
                  un devis personnalisé pourra être proposé avant validation de la commande.
                </p>
              </div>
            </div>

            {/* Article 7 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 7 — Réception des produits</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Le Client est invité à vérifier l&apos;état des produits au moment de la réception
                  de sa commande. En cas de colis endommagé, ouvert ou présentant une anomalie
                  apparente, le Client est invité à émettre des réserves auprès du transporteur et
                  à contacter Sandra PENSADO EI dans les meilleurs délais à l&apos;adresse{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>,
                  en joignant si possible des photographies du colis et du produit concerné.
                  Cette vérification ne prive pas le Client des garanties légales dont il bénéficie.
                </p>
              </div>
            </div>

            {/* Article 8 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 8 — Droit de rétractation</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Conformément aux articles L.221-18 et suivants du Code de la consommation,
                  le Client dispose d&apos;un délai de quatorze (14) jours à compter du lendemain
                  de la réception du produit pour exercer son droit de rétractation, sans avoir
                  à motiver sa décision.
                </p>
                <p>
                  Pour exercer son droit de rétractation, le Client doit notifier sa décision par
                  email à l&apos;adresse{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>,
                  au moyen d&apos;une déclaration claire exprimant sa volonté de se rétracter,
                  ou en utilisant le{" "}
                  <a href="#formulaire-retractation" className="text-warm hover:underline font-medium">
                    formulaire type de rétractation disponible ci-dessous
                  </a>.
                </p>
                <p>
                  Le Client devra retourner le produit concerné dans un délai de quatorze (14) jours
                  suivant la communication de sa décision. Le produit devra être retourné dans son
                  emballage d&apos;origine, en parfait état, non utilisé, non abîmé et accompagné de
                  tous ses accessoires éventuels. Les frais de retour sont à la charge du Client.
                </p>
                <p>
                  En cas d&apos;exercice valable du droit de rétractation, Sandra PENSADO EI procédera
                  au remboursement des sommes versées par le Client, y compris les frais de livraison
                  initiaux standard, à l&apos;exclusion des frais de retour, dans un délai de quatorze (14)
                  jours suivant la notification de la rétractation. Le remboursement pourra toutefois être
                  différé jusqu&apos;à la récupération du produit ou jusqu&apos;à ce que le Client fournisse
                  une preuve d&apos;expédition du produit.
                </p>
                <p>
                  Le droit de rétractation ne s&apos;applique pas aux produits confectionnés selon les
                  spécifications du Client ou nettement personnalisés, conformément à l&apos;article
                  L.221-28 du Code de la consommation.
                </p>
              </div>
            </div>

            {/* Article 9 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 9 — Garanties légales</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Tous les produits vendus sur le site bohemianhouse.fr bénéficient des garanties
                  légales applicables, à savoir la garantie légale de conformité (articles L.217-3
                  et suivants du Code de la consommation) et la garantie légale contre les vices
                  cachés (articles 1641 et suivants du Code civil).
                </p>
                <p>
                  Au titre de la garantie légale de conformité, le Client bénéficie d&apos;un délai
                  de deux (2) ans à compter de la délivrance du produit pour agir en cas de défaut
                  de conformité. En cas de défaut de conformité, le Client peut demander la mise en
                  conformité du produit, par réparation ou remplacement, dans les conditions prévues
                  par le Code de la consommation.
                </p>
                <p>
                  Au titre de la garantie contre les vices cachés, le Client peut agir dans un délai
                  de deux (2) ans à compter de la découverte du vice, à condition que le défaut soit
                  caché, antérieur à la vente et rende le produit impropre à l&apos;usage auquel il
                  est destiné, ou en diminue très fortement l&apos;usage.
                </p>
                <p>
                  En cas de non-conformité ou de défaut constaté, le Client est invité à contacter
                  Sandra PENSADO EI à l&apos;adresse{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>,
                  en joignant si possible une description du problème et des photographies du
                  produit concerné.
                </p>
                <p className="text-sm text-charcoal/70 bg-creamy/40 rounded-xl p-4">
                  Les variations liées au caractère artisanal des produits (légères différences de
                  couleur, de texture, de forme, de finition ou de dimensions) ne constituent pas
                  un défaut de conformité dès lors qu&apos;elles n&apos;altèrent pas les
                  caractéristiques essentielles du produit.
                </p>
              </div>
            </div>

            {/* Article 10 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 10 — Responsabilité</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Sandra PENSADO EI s&apos;efforce de fournir des informations exactes et à jour sur
                  le site bohemianhouse.fr. Toutefois, l&apos;éditeur ne saurait être tenu responsable
                  des erreurs, omissions ou indisponibilités du site, ni des dommages directs ou
                  indirects résultant de l&apos;accès au site ou de son utilisation. L&apos;utilisateur
                  est responsable de l&apos;utilisation qu&apos;il fait des informations disponibles.
                </p>
              </div>
            </div>

            {/* Article 11 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 11 — Données personnelles</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Dans le cadre de la vente en ligne sur le site bohemianhouse.fr, des données
                  personnelles du Client peuvent être collectées, notamment ses nom, prénom, adresse
                  email, adresse postale, numéro de téléphone, informations de commande et informations
                  nécessaires au paiement.
                </p>
                <p>
                  Le responsable du traitement est Sandra PENSADO EI, entrepreneur individuel
                  exerçant sous le nom commercial COMPTOIR BOHEME.
                </p>
                <p>
                  Les données collectées sont nécessaires au traitement des commandes, au paiement,
                  à la livraison des produits, à la gestion de la relation client, au service
                  après-vente, ainsi qu&apos;au respect des obligations légales, comptables et
                  fiscales applicables.
                </p>
                <p>
                  Les données personnelles du Client ne sont jamais vendues à des tiers. Elles peuvent
                  toutefois être transmises aux prestataires strictement nécessaires à l&apos;exécution
                  de la commande (prestataires de paiement, transporteurs, hébergement, maintenance
                  technique ou service client).
                </p>
                <p>
                  Conformément au RGPD et à la loi Informatique et Libertés modifiée, le Client dispose
                  d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition,
                  de limitation du traitement et de portabilité de ses données personnelles. Pour
                  exercer ses droits&nbsp;:{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>.
                  En cas de difficulté, le Client dispose également du droit d&apos;introduire une
                  réclamation auprès de la CNIL.
                </p>
              </div>
            </div>

            {/* Article 12 */}
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">Article 12 — Litiges et médiation</h2>
              <div className="text-charcoal/85 leading-relaxed space-y-3">
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de réclamation ou de
                  litige, le Client est invité à contacter en priorité Sandra PENSADO EI à
                  l&apos;adresse{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>,
                  afin de rechercher une solution amiable.
                </p>
                <p>
                  Conformément aux articles L.612-1 et suivants du Code de la consommation,
                  le Client consommateur peut recourir gratuitement à un médiateur de la consommation
                  en vue de la résolution amiable d&apos;un litige, sous réserve d&apos;avoir
                  préalablement adressé une réclamation écrite à Sandra PENSADO EI.
                </p>
                <p className="text-sm text-charcoal/70">
                  Médiateur de la consommation&nbsp;: informations disponibles sur demande à{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>.
                </p>
                <p>
                  À défaut de résolution amiable, le litige pourra être porté devant les juridictions
                  françaises compétentes, conformément aux règles de droit commun applicables.
                </p>
              </div>
            </div>

            <p className="text-xs text-charcoal/55 italic pt-4 border-t border-charcoal/10">
              Dernière mise à jour : mai 2026.
            </p>
          </div>

          {/* Formulaire de rétractation */}
          <div
            id="formulaire-retractation"
            className="mt-12 bg-gradient-to-br from-creamy/40 to-soft rounded-3xl p-8 md:p-12 shadow-lg shadow-charcoal/10 border border-warm/40 space-y-8 scroll-mt-28"
          >
            <div className="text-center">
              <span className="inline-block text-warm/80 text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Annexe aux CGV
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                Formulaire type de rétractation
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-warm to-transparent mx-auto mt-3" />
            </div>

            <p className="text-sm text-charcoal/70 italic leading-relaxed">
              Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez
              vous rétracter de votre commande.
            </p>

            <div className="text-charcoal/85 leading-relaxed space-y-2">
              <p className="font-medium text-charcoal">À l&apos;attention de&nbsp;:</p>
              <address className="not-italic pl-4 border-l-2 border-warm/30 space-y-0.5">
                <p>Sandra PENSADO EI</p>
                <p>Entrepreneur individuel exerçant sous le nom commercial COMPTOIR BOHEME</p>
                <p>23 chemin des Patinières</p>
                <p>74100 Vétraz-Monthoux</p>
                <p>France</p>
                <p>
                  Email&nbsp;:{" "}
                  <a href="mailto:contact@bohemianhouse.fr" className="text-warm hover:underline">
                    contact@bohemianhouse.fr
                  </a>
                </p>
              </address>
            </div>

            <div className="text-charcoal/85 leading-relaxed space-y-5">
              <p>
                Je vous notifie par la présente ma rétractation du contrat portant sur la vente
                du ou des produits ci-dessous&nbsp;:
              </p>

              {[
                { label: "Produit(s) concerné(s)", lines: 2 },
                { label: "Numéro de commande", lines: 1 },
                { label: "Commandé le", lines: 1 },
                { label: "Reçu le", lines: 1 },
                { label: "Nom du Client", lines: 1 },
                { label: "Adresse du Client", lines: 2 },
                { label: "Adresse email utilisée lors de la commande", lines: 1 },
                { label: "Date", lines: 1 },
              ].map(({ label, lines }) => (
                <div key={label}>
                  <p className="font-medium text-charcoal mb-1">{label}&nbsp;:</p>
                  {Array.from({ length: lines }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-px bg-charcoal/20 mt-6"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ))}

              <div>
                <p className="font-medium text-charcoal mb-1">
                  Signature du Client&nbsp;:
                  <span className="font-normal text-charcoal/60 ml-2 text-sm">
                    (uniquement en cas de notification sur papier)
                  </span>
                </p>
                <div className="w-full h-px bg-charcoal/20 mt-10" aria-hidden="true" />
              </div>
            </div>

            {/* Bouton pour copier / imprimer */}
            <div className="text-center pt-4">
              <a
                href="mailto:contact@bohemianhouse.fr?subject=Formulaire%20de%20r%C3%A9tractation&body=Je%20vous%20notifie%20ma%20r%C3%A9tractation.%0A%0AProduit(s)%20concern%C3%A9(s)%20%3A%20%0AN%C2%B0%20de%20commande%20%3A%20%0ACommandé%20le%20%3A%20%0AReçu%20le%20%3A%20%0ANom%20%3A%20%0AAdresse%20%3A%20%0AEmail%20%3A%20%0ADate%20%3A%20"
                className="inline-flex items-center gap-2 bg-charcoal text-soft px-7 py-3.5 rounded-full font-medium hover:bg-warm transition-colors shadow-md shadow-charcoal/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Envoyer le formulaire par email
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
