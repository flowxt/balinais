"use client";

import { useState, useEffect } from "react";
import StarRating from "./StarRating";

export default function ProductReviews({ productId, productTitle }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    body: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setRating(data.rating || 0);
          setCount(data.count || 0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productTitle,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          rating: 5,
          title: "",
          body: "",
        });
      } else {
        const data = await response.json();
        setSubmitError(data.error || "Erreur lors de l'envoi de l'avis");
      }
    } catch (error) {
      setSubmitError("Erreur lors de l'envoi de l'avis");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg shadow-charcoal/5">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-8 border-b border-charcoal/10">
        <div>
          <h2 className="font-serif text-2xl text-charcoal mb-2">
            Avis clients
          </h2>
          {count > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={rating} count={count} size="lg" />
              <span className="text-charcoal/60">
                {rating.toFixed(1)} / 5 ({count} avis)
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="self-start md:self-auto px-6 py-3 bg-charcoal text-soft rounded-xl font-medium hover:bg-warm transition-colors"
        >
          {showForm ? "Annuler" : "Laisser un avis"}
        </button>
      </div>

      {/* Message de succès */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          Merci pour votre avis ! Il sera publié après modération.
        </div>
      )}

      {/* Formulaire d'avis */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 pb-8 border-b border-charcoal/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Votre nom *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30"
                placeholder="Marie Dupont"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Votre email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30"
                placeholder="marie@email.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Note *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= formData.rating ? "text-warm" : "text-charcoal/20"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Titre de votre avis
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30"
              placeholder="Super produit !"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Votre avis *
            </label>
            <textarea
              required
              rows={4}
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-warm/50 focus:border-warm/50 transition-all bg-soft/30 resize-none"
              placeholder="Partagez votre expérience avec ce produit..."
            />
          </div>

          {submitError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-charcoal text-soft rounded-xl font-medium hover:bg-warm transition-colors disabled:opacity-50"
          >
            {submitting ? "Envoi en cours..." : "Publier mon avis"}
          </button>
        </form>
      )}

      {/* Liste des avis */}
      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-charcoal/20 border-t-warm rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Chargement des avis...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-charcoal mb-2">Aucun avis pour le moment</h3>
          <p className="text-charcoal/60 text-sm">
            Soyez le premier à partager votre expérience !
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="pb-6 border-b border-charcoal/5 last:border-0"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-charcoal">
                      {review.reviewer?.name || "Client"}
                    </span>
                    {review.verified && (
                      <span className="text-[10px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Achat vérifié
                      </span>
                    )}
                  </div>
                  <StarRating rating={review.rating} count={0} showCount={false} size="sm" />
                </div>
                <span className="text-xs text-charcoal/40">
                  {formatDate(review.created_at)}
                </span>
              </div>

              {review.title && (
                <h4 className="font-medium text-charcoal mb-2">{review.title}</h4>
              )}
              <p className="text-charcoal/70 text-sm leading-relaxed">
                {review.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
