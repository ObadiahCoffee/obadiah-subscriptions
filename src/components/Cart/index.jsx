import React from 'react';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const Cart = (props) => (
  <Section>
    <div className={styles.sectionContainer}>
      <div className={styles.cartContainer}>
        <div className={styles.cartSummaryContainer}>
          <h3>Subscription Details</h3>
          <div className={styles.cartItemsContainer}>
            <div className={styles.cartItem}>Boxes<span>2</span></div>
            <div className={styles.cartItem}>Frequency<span>Weekly</span></div>
            <div className={styles.cartItem}>Location<span>United Kingdom</span></div>
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
export default Cart;
