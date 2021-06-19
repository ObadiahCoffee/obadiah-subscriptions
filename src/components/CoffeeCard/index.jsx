import React, { useState, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Carousel, ReadMore } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const CoffeeCard = () => {
  const { data, tableData } = useContext(ThemeContext);

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          adaptiveHeight: false,
          infinite: true,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          dots: true,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 390,
        settings: {
          dots: true,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className={styles.coffeesContainer}>
      {/* <Carousel settings={carouselSettings}> */}
      {tableData.map((coffee, i) => {
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
          <div className={styles.coffeeCard} key={i}>
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

            <a href="#">Read More About The Origins</a>
          </div>
        );
      })}
      {/* </Carousel> */}
    </div>
  );
};
export default CoffeeCard;
