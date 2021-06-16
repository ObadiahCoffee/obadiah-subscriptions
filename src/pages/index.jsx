import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header, Footer, Landing, Section, Carousel, Image , CoffeeDetails, CoffeeSelection, Cart } from 'components';
import '../sass/global/styles.scss';
import * as styles from './styles.module.scss';

// Assets
import { ReactComponent as Box1 } from '../images/coffee-box-1.svg';
import { ReactComponent as Box2 } from '../images/coffee-box-2.svg';
import { ReactComponent as Box4 } from '../images/coffee-box-4.svg';

const homeQuery = graphql`
  query {
    ...homeData
  }
`;

const Homepage = (props) => {
  const {
    prismicHome: { data },
  } = useStaticQuery(homeQuery);

  const { box_price_1: price1, box_price_2: price2, box_price_4: price4 } = data;

  const coffeeData = [
    [
      { title: 'How many boxes would you like?' },
      { img: <Box1 />, label: `1 box for £${price1}`, sublabel: '(250g)' },
      { img: <Box2 />, label: `2 boxes for £${price2}`, sublabel: '(250g)' },
      { img: <Box4 />, label: `4 boxes for £${price4}`, sublabel: '(250g)' },
    ],
    [
      { title: 'And how often would you like to receive it?' },
      { label: 'Weekly' },
      { label: 'Fornightly' },
      { label: 'Monthly' },
    ],
    [
      { title: 'Finally, where in the world are you?' },
      { label: 'United Kingdom' },
      { label: 'Europe' },
      { label: 'Rest of World' },
    ],
  ];

  return (
    <div className={styles.mainContainer}>
      <Header />
      <Landing />
      <CoffeeDetails />
      {coffeeData.map(section => (
        <CoffeeSelection fieldData={section} />
      ))}
      <Cart />
      <Footer />
    </div>
  );
};
export default Homepage;
