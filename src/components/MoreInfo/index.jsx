import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ReactComponent as Cross } from '../../images/cross.svg';
import * as styles from './styles.module.scss';

const MoreInfo = () => {
  const { isActiveMoreInfo, setIsActiveMoreInfo } = useContext(ThemeContext);

  const toggleMoreInfo = () => {
    setIsActiveMoreInfo(!isActiveMoreInfo);
  };

  return (
    <>
      <div className={isActiveMoreInfo ? `${styles.moreInfoContainer} ${styles.open}` : `${styles.moreInfoContainer} ${styles.close}`}>
        <Cross onClick={toggleMoreInfo} />
        <div className={isActiveMoreInfo ? `${styles.contentContainer} ${styles.show}` : `${styles.contentContainer} ${styles.hide}`}>
          <h4>Subscriptions</h4>
          <h3>Monthly £21</h3>
          <h3>Fortnightly £19.50</h3>
          <p>
            You will always receive two boxes of coffee, one of each selection. Subscriptions are dispatched on the next
            production day following the initial order date and recurring payment. Free first class delivery is included
            in the price of the subscription.
          </p>
          <p>
            Once you have subscribed, you can easily change the next order date from your account. If you decide to
            cancel, you can do this whenever you like, free of charge.
          </p>
          <p>
            Occasionally we will send a rare coffee as one of the selections. Rare coffees will be sent in 150g portions.
          </p>
        </div>
      </div>
      <div className={styles.stickyButton} onClick={toggleMoreInfo}>
        <span>More Info</span>
      </div>
    </>
  );
};

export default MoreInfo;
