import React, { useState, useContext } from 'react';
import { Section } from 'components';
import { CartContext } from '../../context/Cart';
import * as styles from './styles.module.scss';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <Section>
      <div className="sectionContainer">
        <div className={styles.cartContainer}>
          <div className={styles.cartSummaryContainer}>
            <h3>Subscription Details</h3>
            <div className={styles.cartItemsContainer}>
              <div className={styles.cartItem}>
                Boxes<span>{cart.boxes}</span>
              </div>
              <div className={styles.cartItem}>
                Frequency<span>{cart.frequency}</span>
              </div>
              <div className={styles.cartItem}>
                Location<span>{cart.location}</span>
              </div>
            </div>
            <div className={styles.cartTotal}>Total: £{cart.total.toFixed(2)} p/m</div>
            <div className={styles.cartNotes}>
              <span>Need to make changes? No problem.</span>
              <span>Check the different selections before you go through to payment.</span>
            </div>
          </div>
          <div className={styles.checkoutButton}>Checkout</div>
          <div className={styles.checkoutInfo}>
            <span>i</span>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default Cart;
