import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const CoffeeCard = (props) => {
  // LINKS DATA FROM SETTINGS ////////////////////////////////////////////////////
  const homeQuery = graphql`
    query {
      ...homeData
    }
  `;

  const {
    prismicHome: { data },
  } = useStaticQuery(homeQuery);

  // Dates
  const {
    coffee_1_altitude: altitude1,
    coffee_1_harvest: harvest1,
    coffee_1_process: process1,
    coffee_1_producer: producer1,
    coffee_1_read_more_cta: readMoreCTA1,
    coffee_1_read_more_image: readMoreImage1,
    coffee_1_read_more_wysiwyg: readMoreWYSIWIG1,
    coffee_1_region: region1,
    coffee_1_region_tagline: regionTagline1,
    coffee_1_region_title: regionTitle1,
    coffee_1_taste_notes: tasteNotes1,
    coffee_1_variety: variety1,
    coffee_2_altitude: altitude2,
    coffee_2_harvest: harvest2,
    coffee_2_process: process2,
    coffee_2_producer: producer2,
    coffee_2_read_more_cta: readMoreCTA2,
    coffee_2_read_more_image: readMoreImage2,
    coffee_2_read_more_wysiwyg: readMoreWYSIWIG2,
    coffee_2_region: region2,
    coffee_2_region_tagline: regionTagline2,
    coffee_2_region_title: regionTitle2,
    coffee_2_taste_notes: tasteNotes2,
    coffee_2_variety: variety2,
  } = data;

  const tableData = [
    {
      regionTitle: regionTitle1?.text,
      regionTagline: regionTagline1?.text,
      region: region1?.text,
      harvest: harvest1,
      process: process1?.text,
      altitude: altitude1?.text,
      producer: producer1?.text,
      tasteNotes: tasteNotes1?.text,
      variety: variety1?.text,
      readMoreCTA: readMoreCTA1?.text,
      readMoreImage: readMoreImage1,
      readMoreWYSIWIG: readMoreWYSIWIG1?.text,
    },
    {
      regionTitle: regionTitle2?.text,
      regionTagline: regionTagline2?.text,
      region: region2?.text,
      harvest: harvest2,
      process: process2?.text,
      altitude: altitude2?.text,
      producer: producer2?.text,
      tasteNotes: tasteNotes2?.text,
      variety: variety2?.text,
      readMoreCTA: readMoreCTA2?.text,
      readMoreImage: readMoreImage2,
      readMoreWYSIWIG: readMoreWYSIWIG1?.text,
    },
  ];

  return (
    <div className={styles.coffeesContainer}>
      {tableData.map((coffee, i) => {
        const { regionTitle, regionTagline, region, harvest, process, altitude, producer, tasteNotes, variety, readMoreCTA, readMoreImage, readMoreWYSIWIG } = coffee;
        return (
          <div className={styles.coffeeCard} key={i}>
            <div className={styles.coffeeRegionTagline}>{data.coffee_1_region_tagline?.text}</div>
            <div className={styles.coffeeRegionTitle}>{regionTitle}</div>
            <div className={styles.coffeeInfoContainer}>
              <div className={styles.infoRowItem}>Region<span>{region}</span></div>
              <div className={styles.infoRowItem}>Harvest<span>{harvest}</span></div>
              <div className={styles.infoRowItem}>Process<span>{process}</span></div>
              <div className={styles.infoRowItem}>Altitude<span>{altitude} MASL</span></div>
              <div className={styles.infoRowItem}>Taste Notes<span>{tasteNotes}</span></div>
            </div>

            <div className={styles.coffeeProducedBy}>
              Produced by
              <div className={styles.coffeeProducedByValue}>{producer}</div>
            </div>

            <a href="#">Read More About The Origins</a>
          </div>
        );
      })}
    </div>
  );
};
export default CoffeeCard;
