import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const Landing = (props) => {

  // LINKS DATA FROM SETTINGS ////////////////////////////////////////////////////
  const homeQuery = graphql`
    query {
      ...homeData
    }
  `;

  const { prismicHome } = useStaticQuery(homeQuery);

  return (
    <Section>
      <div className={styles.sectionContainer}>
        <h2>{prismicHome.data.header_title.raw[0].text}</h2>
        <p>{prismicHome.data.header_description.raw[0].text}</p>
        <a href="#">Set up a subscription</a>
      </div>
    </Section>
  );
};
export default Landing;
