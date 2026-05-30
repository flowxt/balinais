// Helpers serveur pour l'API Admin Shopify (création/màj de clients, métafields).
// Utilisé pour gérer l'authentification 100% sur bohemianhouse.fr :
//  - création de compte (sans email d'activation Shopify)
//  - réinitialisation de mot de passe via un jeton maison
//
// ⚠️ Ces fonctions ne doivent JAMAIS être importées côté client : elles utilisent
// le token Admin (secret).

import crypto from "crypto";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const ADMIN_API_VERSION = "2024-10";

const RESET_NAMESPACE = "auth";
const RESET_KEY = "reset_token";

function adminUrl(path) {
  return `https://${SHOPIFY_DOMAIN}/admin/api/${ADMIN_API_VERSION}/${path}`;
}

function adminHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": ADMIN_TOKEN,
  };
}

export function isAdminConfigured() {
  return Boolean(SHOPIFY_DOMAIN && ADMIN_TOKEN);
}

// Recherche un client par email. Retourne l'objet client Admin ou null.
export async function findCustomerByEmail(email) {
  const res = await fetch(
    adminUrl(`customers/search.json?query=${encodeURIComponent(`email:${email}`)}`),
    { headers: adminHeaders() }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const customers = data.customers || [];
  // search peut être approximatif → on vérifie l'email exact
  return (
    customers.find(
      (c) => (c.email || "").toLowerCase() === email.toLowerCase()
    ) || null
  );
}

// Crée un client ACTIF avec mot de passe, sans email d'activation/bienvenue.
// Retourne { customer } ou { error, status }.
export async function createCustomerWithPassword({
  firstName,
  lastName,
  email,
  password,
}) {
  const res = await fetch(adminUrl("customers.json"), {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({
      customer: {
        first_name: firstName || "",
        last_name: lastName || "",
        email,
        verified_email: true,
        password,
        password_confirmation: password,
        send_email_welcome: false,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Shopify renvoie un objet { errors: { email: ["has already been taken"] } }
    const emailErr = data?.errors?.email;
    if (emailErr && /taken|already/i.test(JSON.stringify(emailErr))) {
      return { error: "EMAIL_TAKEN", status: 409 };
    }
    return {
      error: data?.errors ? JSON.stringify(data.errors) : "ADMIN_CREATE_FAILED",
      status: res.status,
    };
  }

  return { customer: data.customer };
}

// Met à jour le mot de passe d'un client existant (Admin API).
export async function updateCustomerPassword(customerId, password) {
  const res = await fetch(adminUrl(`customers/${customerId}.json`), {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify({
      customer: {
        id: customerId,
        password,
        password_confirmation: password,
      },
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return {
      error: data?.errors ? JSON.stringify(data.errors) : "ADMIN_UPDATE_FAILED",
      status: res.status,
    };
  }
  return { success: true };
}

// --- Jetons de réinitialisation (stockés dans un métafield client) ---

export function hashToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function getResetMetafield(customerId) {
  const res = await fetch(
    adminUrl(`customers/${customerId}/metafields.json?namespace=${RESET_NAMESPACE}`),
    { headers: adminHeaders() }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return (
    (data.metafields || []).find(
      (m) => m.namespace === RESET_NAMESPACE && m.key === RESET_KEY
    ) || null
  );
}

// Enregistre (ou met à jour) le jeton de reset haché + expiration sur le client.
export async function storeResetToken(customerId, rawToken, ttlMs = 60 * 60 * 1000) {
  const payload = JSON.stringify({
    hash: hashToken(rawToken),
    expiresAt: Date.now() + ttlMs,
  });

  const existing = await getResetMetafield(customerId);

  if (existing) {
    const res = await fetch(adminUrl(`metafields/${existing.id}.json`), {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({
        metafield: { id: existing.id, type: "json", value: payload },
      }),
    });
    return res.ok;
  }

  const res = await fetch(adminUrl(`customers/${customerId}/metafields.json`), {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({
      metafield: {
        namespace: RESET_NAMESPACE,
        key: RESET_KEY,
        type: "json",
        value: payload,
      },
    }),
  });
  return res.ok;
}

// Vérifie le jeton fourni contre celui stocké. Retourne true/false.
export async function verifyResetToken(customerId, rawToken) {
  const metafield = await getResetMetafield(customerId);
  if (!metafield) return false;

  let stored;
  try {
    stored = JSON.parse(metafield.value);
  } catch {
    return false;
  }

  if (!stored?.hash || !stored?.expiresAt) return false;
  if (Date.now() > stored.expiresAt) return false;

  // Comparaison à temps constant
  const a = Buffer.from(stored.hash);
  const b = Buffer.from(hashToken(rawToken));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Invalide le jeton (usage unique) en effaçant le métafield.
export async function clearResetToken(customerId) {
  const metafield = await getResetMetafield(customerId);
  if (!metafield) return;
  await fetch(adminUrl(`metafields/${metafield.id}.json`), {
    method: "DELETE",
    headers: adminHeaders(),
  });
}
