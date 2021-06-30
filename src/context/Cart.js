import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Client from 'shopify-buy';

// SHOPIFY SETUP ///////////////////////////////////////////////////////////////
const client = Client.buildClient({
  domain: process.env.GATSBY_SHOP_URL || `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
});

const CHECKOUT_SESSION_ID = 'shopify_checkout_id';

// Storage of default cart content and pass it down via cartcontext ////////////
const defaultCartContext = {
  client,
  checkout: { lineItems: [] },
};

// const reChargeCart = {
//   cart: {
//     token: '',
//     items: [
//       {
//         quantity: 1,
//         variant_id: 40133083037850,
//         product_id: 6815866323098,
//       },
//     ],
//   },
// };

export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }) => {
  // Shopify product variants for each possible combination
  const shopifyProductVariants = [
    { frequency: 'Weekly', boxes: '1', variant: '40222230085786', selling_plan: '530481306' },
    { frequency: 'Weekly', boxes: '2', variant: '40222230118554', selling_plan: '530481306' },
    { frequency: 'Weekly', boxes: '4', variant: '40222230151322', selling_plan: '530481306' },
    { frequency: 'Fortnightly', boxes: '1', variant: '40222199939226', selling_plan: '530415770' },
    { frequency: 'Fortnightly', boxes: '2', variant: '40222199971994', selling_plan: '530415770' },
    { frequency: 'Fortnightly', boxes: '4', variant: '40222200004762', selling_plan: '530415770' },
    { frequency: 'Monthly', boxes: '1', variant: '40222225006746', selling_plan: '530448538' },
    { frequency: 'Monthly', boxes: '2', variant: '40222225039514', selling_plan: '530448538' },
    { frequency: 'Monthly', boxes: '4', variant: '40222225072282', selling_plan: '530448538' },
  ];

  // Cart state to hold user order selection until it gets put into the checkout upon clicking checkout
  const [cart, setCart] = useState({
    boxes: '1',
    frequency: 'Weekly',
    location: 'United Kingdom',
    total: 12,
  });

  // shopifyVariant state to be updated once the cart is updated, via useEffect
  const [shopifyVariant, setShopifyVariant] = useState({
    variant_id: '40133083037850',
    selling_plan: '530481306'
  });

  const [checkout, setCheckout] = useState(null);

  // Create new checkout if session id does not exist //////////////////////////
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

  // Fetch user cart if one exists /////////////////////////////////////////////
  const fetchCheckout = async (id) => {
    try {
      const data = await client.checkout.fetch(id);
      if (!data.completedAt) {
        setCheckout(data);
      }
    } catch (error) {
      console.error('Error fetching checkout', error);
      localStorage.setItem(CHECKOUT_SESSION_ID, null);
    }
  };

  useEffect(() => {
    createNewCheckout();
  }, []);

  // Add to cart ///////////////////////////////////////////////////////////////
  const addToCart = async () => {
    console.log('adding to cart');
    const checkoutId = checkout.id;
    const lineItemsToAdd = [{ variantId: shopifyVariant, quantity: 1 }];
    const newCheckout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    setCheckout(newCheckout);
    console.log('lineItems', lineItemsToAdd);
    console.log('newCheckout', newCheckout);
    console.log('checkout', client.checkout);
    console.log('checkoutURL', newCheckout.webUrl);
    console.log('shopifyVariant', shopifyVariant);
    console.log(
      'ReCharge URL:',
      `https://checkout.rechargeapps.com/r/checkout?domain=${process.env.GATSBY_SHOP_URL}&cart_token=${checkoutId}`
    );
  };

  // Updates shopify variant value equivalent to combination within cart
  const updateShopifyVariant = () => {
    const variant_id = shopifyProductVariants.filter(
      (product) => cart.frequency === product.frequency && cart.boxes === product.boxes
    )[0]?.variant;

    const selling_plan = shopifyProductVariants.filter(
      (product) => cart.frequency === product.frequency && cart.boxes === product.boxes
    )[0]?.selling_plan;

    setShopifyVariant({
      variant_id,
      selling_plan
    });
  };

  useEffect(() => {
    updateShopifyVariant();
  }, [cart]);

  /// //////////////////////////////////////////////////////////////////////////
  // ReCharge Tests ////////////////////////////////////////////////////////////
  /// //////////////////////////////////////////////////////////////////////////

  const reChargeCart = {
    cart: {
      token: checkout?.id,
      line_items: [
        {
          variant_id: 40133083070618,
          product_id: 6815866323098,
          quantity: 1,
          properties: {
            shipping_interval_unit_type: 'Weeks',
            shipping_interval_frequency: '1',
          },
        },
      ],
    },
    terms_and_conditions: 'on',
    note: 'Test note',
    attributes: {
      my_attribute: 'test',
      utm_source: 'emailcampaign',
      utm_data_source: 'shopify_cookie',
      utm_timestamp: '2021-06-29T15:53:44.767Z',
    },
  };

  console.log(reChargeCart)

  const reChargeCartSubmit = async () => {

    const checkoutUrl = `https://checkout.rechargeapps.com/r/checkout?domain=${process.env.GATSBY_SHOP_URL}&cart_token=fasfasfgasgjkh2323hkh`;
    const cartJSON = JSON.stringify(reChargeCart);
    const headers = {
      'Content-Type': 'application/json',
      'X-Recharge-Access-Token': 'a17118a403eff6328e0389e8a57eed90713d4393704a7b29b50f3da5ef53561e',
    };

    console.log(checkoutUrl)

    try {
      const apiRes = await axios.post(`${process.env.GATSBY_SITE_URL}/api/recharge`, {
        checkoutUrl,
        cartJSON,
        headers,
      });
      window.location.href = checkoutUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const goToCheckout = () => {
    window.location.href = `https://obadiah-coffee.myshopify.com/pages/recharge?variant_id=${shopifyVariant.variant_id}&selling_plan=${shopifyVariant.selling_plan}`;
  }

  const values = {
    shopifyProductVariants,
    cart,
    setCart,
    checkout,
    addToCart,
    reChargeCartSubmit,
    goToCheckout
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const CartConsumer = CartContext.Consumer;
