import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section, CoffeeCard } from 'components';
import * as styles from './styles.module.scss';

const CoffeeDetails = (props) => {

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
        <h2>{data.coffees_title?.text}</h2>
        <CoffeeCard />
      </div>
    </Section>
  );
};
export default CoffeeDetails;
