import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CoffeeSelection } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const CoffeeOrder = ({ goToSection }) => {
  const { coffeeOrderData } = useContext(ThemeContext);

  return (
    <>
      {coffeeOrderData.map((section, index) => (
        <CoffeeSelection fieldData={section} goToSection={goToSection} sectionIndex={2 + index} key={index} />
      ))}
    </>
  );
};
export default CoffeeOrder;
