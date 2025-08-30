"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Cart from "@/app/components/Cart";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter plus tard
    console.log("Formulaire soumis:", formData);
    alert("Merci pour votre message ! Nous vous recontacterons bientôt.");
  };

  return (
    <>
      <Navigation />
      <Cart />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-creamy to-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 tracking-wide">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
              Nous sommes là pour vous accompagner dans votre projet déco
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Accueil
          </Link>
          <span className="text-charcoal/40">/</span>
          <span className="text-charcoal font-medium">Contact</span>
        </nav>
      </div>

      {/* Section principale */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Formulaire de contact */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-8 tracking-wide">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-creamy rounded-lg focus:ring-2 focus:ring-warm focus:border-warm transition-colors bg-soft/30"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-creamy rounded-lg focus:ring-2 focus:ring-warm focus:border-warm transition-colors bg-soft/30"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-creamy rounded-lg focus:ring-2 focus:ring-warm focus:border-warm transition-colors bg-soft/30"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-creamy rounded-lg focus:ring-2 focus:ring-warm focus:border-warm transition-colors bg-soft/30"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="information">Demande d&apos;information</option>
                    <option value="devis">Demande de devis</option>
                    <option value="rdv">Prise de rendez-vous</option>
                    <option value="commande">Suivi de commande</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-creamy rounded-lg focus:ring-2 focus:ring-warm focus:border-warm transition-colors bg-soft/30 resize-none"
                    placeholder="Décrivez-nous votre projet ou votre demande..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-charcoal text-soft px-8 py-4 rounded-lg font-medium hover:bg-rustic transition-colors duration-300 shadow-lg"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-8 tracking-wide">
                Nos coordonnées
              </h2>
              
              <div className="space-y-8">
                
                {/* Adresse */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-2">Showroom</h3>
                    <p className="text-charcoal/80 leading-relaxed">
                      123 Rue de la Paix<br />
                      75001 Paris, France<br />
                      <span className="text-sm text-charcoal/60 italic">Sur rendez-vous uniquement</span>
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-2">Téléphone</h3>
                    <p className="text-charcoal/80 leading-relaxed">
                      <a href="tel:+33123456789" className="hover:text-warm transition-colors">
                        +33 1 23 45 67 89
                      </a><br />
                      <span className="text-sm text-charcoal/60">
                        Lun - Ven : 9h00 - 18h00<br />
                        Sam : 10h00 - 16h00
                      </span>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-2">Email</h3>
                    <p className="text-charcoal/80 leading-relaxed">
                      <a href="mailto:contact@bohemianhouse.fr" className="hover:text-warm transition-colors">
                        contact@bohemianhouse.fr
                      </a><br />
                      <span className="text-sm text-charcoal/60">
                        Réponse sous 24h
                      </span>
                    </p>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm to-creamy rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-2">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-charcoal/80 hover:text-warm transition-colors">
                        Instagram
                      </a>
                      <a href="#" className="text-charcoal/80 hover:text-warm transition-colors">
                        Facebook
                      </a>
                      <a href="#" className="text-charcoal/80 hover:text-warm transition-colors">
                        Pinterest
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-20 bg-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 tracking-wide">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                Proposez-vous des livraisons partout en France ?
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                Oui, nous livrons dans toute la France métropolitaine. Les délais et tarifs 
                varient selon la taille et le poids des articles. Contactez-nous pour un devis personnalisé.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                Puis-je voir les meubles avant achat ?
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                Absolument ! Notre showroom est ouvert sur rendez-vous. Contactez-nous 
                pour planifier votre visite et découvrir nos pièces en personne.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                Vos meubles sont-ils authentiquement balinais ?
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                Oui, tous nos meubles sont importés directement de Bali et fabriqués 
                par des artisans locaux selon les techniques traditionnelles.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                Proposez-vous des services de décoration ?
              </h3>
              <p className="text-charcoal/80 leading-relaxed">
                Nous pouvons vous conseiller dans le choix et l&apos;agencement de vos pièces. 
                N&apos;hésitez pas à nous parler de votre projet !
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
