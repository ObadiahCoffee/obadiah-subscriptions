import React, { useState, useContext } from 'react';
import { Section } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import { CartContext } from '../../context/Cart';
import * as styles from './styles.module.scss';

const CheckoutInfo = () => {
  const { data } = useContext(ThemeContext);

  const { checkout_tooltip: { html: checkoutTooltip } } = data;

  return (
      <>
        <div className={styles.checkoutInfoButton}>
          <span>i</span>
          <div
          className={styles.checkoutInfoContent}
          dangerouslySetInnerHTML={{ __html: checkoutTooltip }}
          />
        </div>
      </>
  );
};
export default CheckoutInfo;
