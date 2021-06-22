import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section, CoffeeCard } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const CoffeeDetails = () => {
  const { data, coffeeSelectionAnchor } = useContext(ThemeContext);

  return (
    <div ref={coffeeSelectionAnchor}>
      <Section>
        <div className={`${styles.container}`}>
          <h2>{data.coffees_title?.text}</h2>
          <CoffeeCard coffeeData={data} />
        </div>
      </Section>
    </div>
  );
};
export default CoffeeDetails;
