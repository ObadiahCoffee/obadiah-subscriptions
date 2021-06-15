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
    coffee_1_read_more_cta: readMoreCta1,
    coffee_1_read_more_image: readMoreImage1,
    coffee_1_read_more_wysiwyg: readMoreWysiwig1,
    coffee_1_region: region1,
    coffee_1_region_tagline: regionTagline1,
    coffee_1_region_title: regionTitle1,
    coffee_1_taste_notes: tasteNotes1,
    coffee_1_variety: variety1,
    coffee_2_altitude: altitude2,
    coffee_2_harvest: harvest2,
    coffee_2_process: process2,
    coffee_2_producer: producer2,
    coffee_2_read_more_cta: readMoreCta2,
    coffee_2_read_more_image: readMoreImage2,
    coffee_2_read_more_wysiwyg: readMoreWysiwig2,
    coffee_2_region: region2,
    coffee_2_region_tagline: regionTagline2,
    coffee_2_region_title: regionTitle2,
    coffee_2_taste_notes: tasteNotes2,
    coffee_2_variety: variety2,
  } = data;

  const tableData = [
    { region: region1.raw[0].text, harvest: harvest1, process: process1.raw[0].text, regionTitle: regionTitle1.raw[0].text, regionTagline: regionTagline1.raw[0].text },
    { region: region2.raw[0].text, harvest: harvest2, process: process2.raw[0].text, regionTitle: regionTitle2.raw[0].text, regionTagline: regionTagline2.raw[0].text }
  ];

  // <div className={styles.coffeeRegionTagline}>{data.coffee_1_region_tagline.raw[0].text}</div>
  //
  // <div className={styles.coffeeRegionTitle}>{data.coffee_1_region_title.raw[0].text}</div>
  //
  // <div className={styles.coffeeInfoContainer}>
  //   <div className={styles.infoRowItem}>
  //     Region
  //     <span>{data.coffee_1_region.raw[0].text}</span>
  //   </div>
  //
  //   <div className={styles.infoRowItem}>
  //     Harvest
  //     <span>{dateMonth}</span>
  //   </div>
  //
  //   <div className={styles.infoRowItem}>
  //     Process
  //     <span>{data.coffee_1_process.raw[0].text}</span>
  //   </div>
  //
  //   <div className={styles.infoRowItem}>
  //     Variety
  //     <span>{data.coffee_1_variety.raw[0].text}</span>
  //   </div>
  //
  //   <div className={styles.infoRowItem}>
  //     Altitude
  //     <span>{data.coffee_1_altitude.raw[0].text} MASL</span>
  //   </div>
  //
  //   <div className={styles.infoRowItem}>
  //     Taste Notes
  //     <span>{data.coffee_1_taste_notes.raw[0].text}</span>
  //   </div>
  // </div>
  //
  // <div className={styles.coffeeProducedBy}>
  //   Produced by
  //   <div className={styles.coffeeProducedByValue}>{data.coffee_1_producer.raw[0].text}</div>
  // </div>

  return (
    <div className={styles.coffeesContainer}>

      {tableData.map(item => {
        const {region, harvest, process, regionTitle, regionTagline} = item;
          return (
            <div className={styles.coffeeCard}>
              <div className={styles.coffeeRegionTagline}>{data.coffee_1_region_tagline.raw[0].text}</div>
              <div className={styles.coffeeRegionTitle}>{regionTitle}</div>
                <div className={styles.infoRowItem}>Region<span>{region}</span></div>
              <a href="#">Read More About The Origins</a>
            </div>
          )
      })}

    </div>
  );
};
export default CoffeeCard;
