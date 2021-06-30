import React, { useState, useContext, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Carousel, ReadMore } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const CoffeeCard = () => {

  const { data, tableData, isActiveAccordion, setIsActiveAccordion, moreInfoAnchor } = useContext(ThemeContext);

  const carouselSettings = {
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          settings: "unslick",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const toggleAccordion = (index) => {

    setIsActiveAccordion(isActiveAccordion.status === "active" && isActiveAccordion.index === index ? {status: "", index: index} : {status: "active", index: index});
    moreInfoAnchor.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

  }


  return (
    <div className={styles.coffeesContainer}>
      <Carousel settings={carouselSettings}>
      {tableData.map((coffee, index) => {
        const {
          regionTitle,
          regionTagline,
          region,
          harvest,
          process,
          altitude,
          producer,
          tasteNotes,
          variety,
          readMoreCTA,
          readMoreImage,
          readMoreWYSIWIG,
        } = coffee;
        return (
            <div className={styles.coffeeCard} key={index}>
              <div className={styles.coffeeRegionTagline}>{data.coffee_1_region_tagline?.text}</div>
              <div className={styles.coffeeRegionTitle}>{regionTitle}</div>
              <div className={styles.coffeeInfoContainer}>
                <div className={styles.infoRowItem}>
                  Region<span>{region}</span>
                </div>
                <div className={styles.infoRowItem}>
                  Harvest<span>{harvest}</span>
                </div>
                <div className={styles.infoRowItem}>
                  Process<span>{process}</span>
                </div>
                <div className={styles.infoRowItem}>
                  Altitude<span>{altitude} MASL</span>
                </div>
                <div className={styles.infoRowItem}>
                  Taste Notes<span>{tasteNotes}</span>
                </div>
              </div>

              <div className={styles.coffeeProducedBy}>
                Produced by
                <div className={styles.coffeeProducedByValue}>{producer}</div>
              </div>

              <a onClick={() => toggleAccordion(index)}>Read More About The Origins</a>
            </div>
        );
      })}
      </Carousel>
      <span className={styles.moreInfoAnchor} ref={moreInfoAnchor} />
      <div className={styles.coffeeDots}><ul></ul></div>
    </div>
  );
};
export default CoffeeCard;
