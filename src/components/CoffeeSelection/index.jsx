import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section, CoffeeCard } from 'components';
import * as styles from './styles.module.scss';

const Landing = (props) => {

  // LINKS DATA FROM SETTINGS ////////////////////////////////////////////////////
  const homeQuery = graphql`
    query {
      ...homeData
    }
  `;

  const { prismicHome: { data } } = useStaticQuery(homeQuery);

  return (
    <Section>
      <div className={styles.sectionContainer}>
        <h2>{data.coffees_title.raw[0].text}</h2>
        <CoffeeCard number="1" />
      </div>
    </Section>
  );
};
export default Landing;
