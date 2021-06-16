import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const CoffeeSelection = ({ fieldData }) => (
  <Section>
    <div className={styles.sectionContainer}>
      <h2>{fieldData[0]?.title}</h2>

      <div className={styles.optionsContainer}>
        {fieldData.slice(1).map((field, index) => {
          const { title, img, label, sublabel } = field;

          return (
            <div className={styles.option} key={index}>
              {img && <div className={styles.imgContainer}>{img}</div>}
              <span className={styles.dot} />
              <span>{label}</span>
              {img && <span className={styles.sublabel}>{sublabel}</span>}
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);

export default CoffeeSelection;
