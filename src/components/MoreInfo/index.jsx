import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ReactComponent as Cross } from '../../images/cross.svg';
import * as styles from './styles.module.scss';

const MoreInfo = () => {
  const { data, isActiveMoreInfo, setIsActiveMoreInfo } = useContext(ThemeContext);

  const toggleMoreInfo = () => {
    setIsActiveMoreInfo(!isActiveMoreInfo);
  };

  const { more_info: { html: moreInfo } } = data;

  return (
    <>
      <div className={isActiveMoreInfo ? `${styles.moreInfoContainer} ${styles.open}` : `${styles.moreInfoContainer} ${styles.close}`}>
        <div className={isActiveMoreInfo ? `${styles.show}` : `${styles.hide}`}>
          <Cross onClick={toggleMoreInfo} />
          <div
          className={styles.contentContainer}
          dangerouslySetInnerHTML={{ __html: moreInfo }}
          />
        </div>
      </div>
      <div className={styles.stickyButton} onClick={toggleMoreInfo}>
        <span>More Info</span>
      </div>
    </>
  );
};

export default MoreInfo;
