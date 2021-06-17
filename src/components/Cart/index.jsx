import React, { useState, useContext } from 'react';
import { Section } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const Cart = (props) => {

  const { cart, setCart } = useContext(ThemeContext);

  return (
    <Section>
    <div className={styles.sectionContainer}>
    <div className={styles.cartContainer}>
    <div className={styles.cartSummaryContainer}>
    <h3>Subscription Details</h3>
    <div className={styles.cartItemsContainer}>
    <div className={styles.cartItem}>Boxes<span>{cart.boxes}</span></div>
    <div className={styles.cartItem}>Frequency<span>{cart.frequency}</span></div>
    <div className={styles.cartItem}>Location<span>{cart.location}</span></div>
    </div>
    <div className={styles.cartTotal}>Total: £21.00 p/m</div>
    <div className={styles.cartNotes}>
    <span>Need to make changes? No problem.</span>
    <span>Check the different selections before you go through to payment.</span>
    </div>
    </div>
    <div className={styles.checkoutButton}>Checkout</div>
    <div className={styles.checkoutInfo}><span>i</span></div>
    </div>
    </div>
    </Section>
  );

}
export default Cart;
