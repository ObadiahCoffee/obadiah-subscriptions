import React, { useState, useEffect } from 'react';
import { usStateQuery, graphql } from 'gatsby';
import { Header, Landing, CoffeeSelection, Section, Carousel, Image } from 'components';
import '../sass/global/styles.scss';
import * as styles from './styles.module.scss';

const Homepage = (props) => (
  <div className={styles.mainContainer}>
    <Header />
    <Landing />
    <CoffeeSelection />
  </div>
);
export default Homepage;
