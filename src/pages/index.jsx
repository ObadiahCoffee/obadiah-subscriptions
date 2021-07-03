import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header, Footer, Landing, Section, Carousel, Image , CoffeeDetails, ReadMore, CoffeeOrder, CoffeeSelection, Cart, MoreInfo, SEO } from 'components';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/Cart';
import '../sass/global/styles.scss';
import * as styles from './styles.module.scss';

const Homepage = () => (
  <ThemeProvider>
    <CartProvider>
      <SEO title="Obadiah Coffee" />
      <div className={styles.mainContainer}>
        <MoreInfo />
        <Header />
        <Landing />
        <CoffeeDetails />
        <ReadMore />
        <CoffeeOrder />
        <Cart />
        <Footer />
      </div>
    </CartProvider>
  </ThemeProvider>
);
export default Homepage;
