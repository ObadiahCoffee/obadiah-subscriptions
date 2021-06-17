import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header, Footer, Landing, Section, Carousel, Image , CoffeeDetails, CoffeeSelection, Cart } from 'components';
import { ThemeProvider } from '../context/ThemeContext';
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
      { title: 'How many boxes would you like?', section: 'boxes' },
      { img: <Box1 className="box1" />, label: `1 box for £${price1}`, sublabel: '(250g)', value: '1', price: price1 },
      { img: <Box2 />, label: `2 boxes for £${price2}`, sublabel: '(250g)', value: '2', price: price2 },
      { img: <Box4 />, label: `4 boxes for £${price4}`, sublabel: '(250g)', value: '4', price: price4 },
    ],
    [
      { title: 'And how often would you like to receive it?', section: 'frequency' },
      { label: 'Weekly' },
      { label: 'Fortnightly' },
      { label: 'Monthly' },
    ],
    [
      { title: 'Finally, where in the world are you?', section: 'location' },
      { label: 'United Kingdom' },
      { label: 'Europe' },
      { label: 'Rest of World' },
    ],
  ];

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};
export default Homepage;
