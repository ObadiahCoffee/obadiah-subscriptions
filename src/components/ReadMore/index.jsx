import React, { useContext, useState, useRef } from 'react';
import { Section, Image } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import { ReactComponent as Cross } from '../../images/cross.svg';
import * as styles from './styles.module.scss';

const ReadMore = () => {
  // Data for population
  const { tableData, isActiveAccordion, setIsActiveAccordion, coffeeSelectionAnchor } = useContext(ThemeContext);

  const closeAccordion = () => {
    setIsActiveAccordion({ status: '', index: isActiveAccordion.index });
    coffeeSelectionAnchor.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={isActiveAccordion.status === 'active' ? `${styles.open}` : `${styles.close}`}>
      <Section>
        <div className={styles.container}>
          <Cross onClick={closeAccordion} />
          <div className={styles.contentContainer}>
            <div className={styles.imageContainer}>
              <Image image={tableData[isActiveAccordion.index].readMoreImage} />
            </div>
            <div
              className={styles.wysiwyg}
              dangerouslySetInnerHTML={{ __html: tableData[isActiveAccordion.index].readMoreWYSIWIG }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ReadMore;
