import React, { useContext, useState, useRef } from 'react';
import { Section, Image } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import { ReactComponent as Cross } from '../../images/cross.svg';
import * as styles from './styles.module.scss';

const ReadMore = () => {
  // Data for population
  const { tableData, setActiveAccordion, setActiveAccordionState, coffeeSelectionAnchor } = useContext(ThemeContext);

  const closeAccordion = () => {
    setActiveAccordionState({ status: '', index: setActiveAccordion.index });
    coffeeSelectionAnchor.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={setActiveAccordion.status === 'active' ? `${styles.open}` : `${styles.close}`}>
      <Section>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            <Image image={tableData[setActiveAccordion.index].readMoreImage} />
          </div>
          <div
            className={styles.wysiwyg}
            dangerouslySetInnerHTML={{ __html: tableData[setActiveAccordion.index].readMoreWYSIWIG }}
          />
          <Cross onClick={closeAccordion} />
        </div>
      </Section>
    </div>
  );
};

export default ReadMore;
