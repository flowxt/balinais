const BASE_URL = "https://bohemianhouse.fr";

// Génère automatiquement /robots.txt
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // On exclut les pages privées / techniques de l'indexation
      disallow: [
        "/api/",
        "/compte",
        "/compte/",
        "/connexion",
        "/inscription",
        "/mot-de-passe-oublie",
        "/reinitialiser-mot-de-passe",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
