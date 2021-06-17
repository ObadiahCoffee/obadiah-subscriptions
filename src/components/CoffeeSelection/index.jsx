import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const CoffeeSelection = ({ fieldData }) => {
  const { title, section } = fieldData[0];

  const { cart, setCart } = useContext(ThemeContext);

  const handleClick = (e) => {
    const selSection = e.target.getAttribute('section');
    const selValue = e.target.getAttribute('value');

    return setCart({ ...cart, [selSection]: selValue });
  };

  return (
    <Section>
      <div className={styles.sectionContainer}>
        <h2>{title}</h2>

        <div className={styles.optionsContainer}>
          {fieldData.slice(1).map((field, index) => {
            const { img, label, sublabel, value, price } = field;
            return (
              <div className={styles.option} key={index}>
                {img && <div className={styles.imgContainer}>{img}</div>}
                <span
                  className={cart[section] === label || cart[section] === value ? styles.dotFilled : styles.dotEmpty}
                  section={section}
                  value={value || label}
                  price={price}
                  onClick={(e) => handleClick(e)}
                />
                <span>{label}</span>
                {img && <span className={styles.sublabel}>{sublabel}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default CoffeeSelection;