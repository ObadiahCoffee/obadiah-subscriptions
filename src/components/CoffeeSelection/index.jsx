import React, { useState, useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import { CartContext } from '../../context/Cart';
import * as styles from './styles.module.scss';

const CoffeeSelection = ({ fieldData, goToSection, sectionIndex }) => {
  const { title, section } = fieldData[0];

  const { cart, setCart } = useContext(CartContext);

  const handleClick = (e) => {
    const selSection = e.target.getAttribute('section');
    const selValue = e.target.getAttribute('value');

    // Updates cart if section options have price //////////////////////////////
    if (e.target.getAttribute('price')) {
      const selPrice = Number(e.target.getAttribute('price'));

      setCart({
        ...cart,
        [selSection]: selValue,
        total: selPrice,
      });
    } else {
      setCart({
        ...cart,
        [selSection]: selValue,
      });
    }

    setTimeout(() => {
      goToSection(false, sectionIndex);
    }, 300);
  };

  return (
    <Section className="anchor">
      <div className="sectionContainer">
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
                  onClick={handleClick}
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
