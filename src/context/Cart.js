import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Client from 'shopify-buy';

// SHOPIFY SETUP ///////////////////////////////////////////////////////////////
const client = Client.buildClient({
  domain: process.env.GATSBY_SHOP_URL || `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
});

const CHECKOUT_SESSION_ID = 'shopify_checkout_id';

// STORAGE OF DEFAULT CART CONTENT AND PASS IT DOWN VIA CARTCONTEXT ////////////
const defaultCartContext = {
  client,
  checkout: { lineItems: [] }
};

export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState({
    boxes: '1',
    frequency: 'Weekly',
    location: 'United Kingdom',
    total: 12,
  });
  const [checkout, setCheckout] = useState(null);

  const values = {
    cart,
    setCart,
  };

  // CREATE NEW CHECKOUT IF SESSION ID DOES NOT EXIST //////////////////////////
  const createNewCheckout = async () => {
    try {
      const data = await client.checkout.create();
      localStorage.setItem(CHECKOUT_SESSION_ID, data.id);
      setCheckout(data);
    } catch (error) {
      console.error('Error creating new cart', error);
      localStorage.removeItem(CHECKOUT_SESSION_ID);
    }
  };

  useEffect(() => {
    createNewCheckout()
  }, []);

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const CartConsumer = CartContext.Consumer;
