"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  createCheckout,
  addToCheckout,
  fetchCheckout,
  removeFromCheckout,
  updateCheckoutLineItem,
} from "@/lib/shopify";

const CartContext = createContext();

// Actions pour le reducer
const CART_ACTIONS = {
  SET_CHECKOUT: "SET_CHECKOUT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_CART: "CLEAR_CART",
};

// Clé localStorage pour persister l'ID du checkout entre sessions/navigations
const CHECKOUT_STORAGE_KEY = "shopify_checkout_id";

const initialState = {
  checkout: null,
  loading: false,
  error: null,
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.SET_CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
        loading: false,
        error: null,
      };
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, checkout: null };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialiser le checkout au chargement :
  //   1. On tente de récupérer un checkout existant via l'ID stocké en localStorage.
  //   2. Si ce checkout est complété (paiement validé), on le considère terminé et
  //      on en crée un nouveau.
  //   3. Sinon on garde l'existant pour conserver les articles déjà ajoutés
  //      (même après un aller-retour vers la page de paiement Shopify).
  useEffect(() => {
    let cancelled = false;

    async function initializeCheckout() {
      try {
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

        const existingCheckoutId =
          typeof window !== "undefined"
            ? localStorage.getItem(CHECKOUT_STORAGE_KEY)
            : null;

        if (existingCheckoutId) {
          const existingCheckout = await fetchCheckout(existingCheckoutId);

          // checkout encore valide et non payé → on le réutilise
          if (
            existingCheckout &&
            !existingCheckout.completedAt &&
            !cancelled
          ) {
            dispatch({
              type: CART_ACTIONS.SET_CHECKOUT,
              payload: existingCheckout,
            });
            return;
          }

          // sinon (checkout payé ou introuvable) on retire la clé périmée
          localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        }

        // Aucun checkout réutilisable → on en crée un nouveau
        const checkout = await createCheckout();
        if (checkout && !cancelled) {
          dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout });
          localStorage.setItem(CHECKOUT_STORAGE_KEY, checkout.id);
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({
            type: CART_ACTIONS.SET_ERROR,
            payload: "Erreur lors de l'initialisation du panier",
          });
        }
      }
    }

    initializeCheckout();

    return () => {
      cancelled = true;
    };
  }, []);

  // Rafraîchir le panier quand l'utilisateur revient sur l'onglet
  // (utile après un aller-retour vers le checkout Shopify où le paiement a pu
  // être validé : on veut alors créer un nouveau panier vide).
  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState !== "visible") return;
      const id =
        typeof window !== "undefined"
          ? localStorage.getItem(CHECKOUT_STORAGE_KEY)
          : null;
      if (!id) return;

      fetchCheckout(id).then((checkout) => {
        if (!checkout) return;
        if (checkout.completedAt) {
          // Paiement validé → on remet à zéro
          localStorage.removeItem(CHECKOUT_STORAGE_KEY);
          createCheckout().then((newCheckout) => {
            if (newCheckout) {
              localStorage.setItem(CHECKOUT_STORAGE_KEY, newCheckout.id);
              dispatch({
                type: CART_ACTIONS.SET_CHECKOUT,
                payload: newCheckout,
              });
            }
          });
        } else {
          // Pas payé → on rafraîchit le contenu (quantité/prix éventuellement
          // modifiés côté Shopify)
          dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout });
        }
      });
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Ajouter un article au panier
  const addToCart = async (variantId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      if (!state.checkout) throw new Error("Panier non initialisé");

      const updatedCheckout = await addToCheckout(state.checkout.id, [
        { variantId, quantity },
      ]);

      if (updatedCheckout) {
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: updatedCheckout });
        dispatch({ type: "OPEN_CART" });
      }
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: "Erreur lors de l'ajout au panier",
      });
    }
  };

  // Supprimer un article du panier
  const removeFromCart = async (lineItemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      if (!state.checkout) return;

      const updatedCheckout = await removeFromCheckout(
        state.checkout.id,
        lineItemId
      );
      if (updatedCheckout) {
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: updatedCheckout });
      }
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: "Erreur lors de la suppression de l'article",
      });
    }
  };

  // Modifier la quantité d'un article
  const updateQuantity = async (lineItemId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(lineItemId);
    }
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      if (!state.checkout) return;

      const updatedCheckout = await updateCheckoutLineItem(
        state.checkout.id,
        lineItemId,
        quantity
      );
      if (updatedCheckout) {
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: updatedCheckout });
      }
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: "Erreur lors de la mise à jour",
      });
    }
  };

  const getTotalItems = () => {
    if (!state.checkout?.lineItems) return 0;
    return state.checkout.lineItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const getTotalPrice = () => {
    if (!state.checkout?.totalPrice) return "0.00";
    return state.checkout.totalPrice.amount;
  };

  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  const redirectToCheckout = () => {
    if (state.checkout?.webUrl) {
      window.location.href = state.checkout.webUrl;
    }
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
    redirectToCheckout,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
