import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const Landing = ({ goToSection }) => {
  // LINKS DATA FROM SETTINGS ////////////////////////////////////////////////////
  const homeQuery = graphql`
    query {
      ...homeData
    }
  `;

  const { prismicHome } = useStaticQuery(homeQuery);

  const handleGoToSection = (event) => {
    event.preventDefault();
    goToSection();
  };

  return (
    <Section className="anchor">
      <div className={styles.sectionContainer}>
        <h2>{prismicHome.data.header_title?.text}</h2>
        <p>{prismicHome.data.header_description?.text}</p>
        <a href="#" onClick={handleGoToSection}>
          Set up a subscription
        </a>
      </div>
    </Section>
  );
};
export default Landing;
