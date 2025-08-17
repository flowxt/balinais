"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { createCheckout, addToCheckout } from "@/lib/shopify";

const CartContext = createContext();

// Actions pour le reducer
const CART_ACTIONS = {
  SET_CHECKOUT: "SET_CHECKOUT",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_CART: "CLEAR_CART",
};

// État initial
const initialState = {
  checkout: null,
  loading: false,
  error: null,
  isOpen: false,
};

// Reducer pour gérer l'état du panier
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
      return {
        ...state,
        loading: action.payload,
      };
    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

// Provider du contexte
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialiser le checkout au chargement
  useEffect(() => {
    async function initializeCheckout() {
      try {
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

        // Vérifier s'il y a un checkout existant dans le localStorage
        const existingCheckoutId = localStorage.getItem("shopify_checkout_id");

        if (existingCheckoutId) {
          // TODO: Récupérer le checkout existant
          // Pour l'instant, on crée un nouveau checkout
        }

        const checkout = await createCheckout();
        if (checkout) {
          dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout });
          localStorage.setItem("shopify_checkout_id", checkout.id);
        }
      } catch (error) {
        dispatch({
          type: CART_ACTIONS.SET_ERROR,
          payload: "Erreur lors de l'initialisation du panier",
        });
      }
    }

    initializeCheckout();
  }, []);

  // Ajouter un article au panier
  const addToCart = async (variantId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

      if (!state.checkout) {
        throw new Error("Panier non initialisé");
      }

      const lineItemsToAdd = [
        {
          variantId,
          quantity,
        },
      ];

      const updatedCheckout = await addToCheckout(
        state.checkout.id,
        lineItemsToAdd
      );

      if (updatedCheckout) {
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: updatedCheckout });
        dispatch({ type: "TOGGLE_CART" }); // Ouvrir le panier après ajout
      }
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: "Erreur lors de l'ajout au panier",
      });
    }
  };

  // Calculer le nombre total d'articles
  const getTotalItems = () => {
    if (!state.checkout?.lineItems) return 0;
    return state.checkout.lineItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // Calculer le prix total
  const getTotalPrice = () => {
    if (!state.checkout?.totalPrice) return "0.00";
    return state.checkout.totalPrice.amount;
  };

  // Ouvrir/fermer le panier
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  // Rediriger vers le checkout Shopify
  const redirectToCheckout = () => {
    if (state.checkout?.webUrl) {
      window.location.href = state.checkout.webUrl;
    }
  };

  const value = {
    ...state,
    addToCart,
    toggleCart,
    closeCart,
    redirectToCheckout,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook pour utiliser le contexte
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
