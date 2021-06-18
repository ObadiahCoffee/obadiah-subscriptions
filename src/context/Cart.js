import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOP_URL || `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
});

const defaultCartContext = {
  client,
};

export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    boxes: '1',
    frequency: 'Weekly',
    location: 'United Kingdom',
    total: 12,
  });

  const values = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const CartConsumer = CartContext.Consumer;
