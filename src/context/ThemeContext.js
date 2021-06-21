import React, { createContext, useContext, useState, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// Assets
import { ReactComponent as Box1 } from '../images/coffee-box-1.svg';
import { ReactComponent as Box2 } from '../images/coffee-box-2.svg';
import { ReactComponent as Box4 } from '../images/coffee-box-4.svg';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  // DATA FROM PRISMIC /////////////////////////////////////////////////////////

  const homeQuery = graphql`
    query {
      ...homeData
    }
  `;

  const { prismicHome: { data } } = useStaticQuery(homeQuery);

  // COFFEE INFORMATION DATA ///////////////////////////////////////////////////

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
      readMoreWYSIWIG: readMoreWYSIWIG1?.html,
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
      readMoreWYSIWIG: readMoreWYSIWIG1?.html,
    },
  ];

  const [setActiveAccordion, setActiveAccordionState] = useState({status: "", index: 0});

  // Anchors
  const moreInfoAnchor = useRef(null)
  const coffeeSelectionAnchor = useRef(null)

  // COFFEE ORDER DATA /////////////////////////////////////////////////////////

  const { box_price_1: price1, box_price_2: price2, box_price_4: price4 } = data;

  const coffeeOrderData = [
    [
      { title: 'How many boxes would you like?', section: 'boxes' },
      { img: <Box1 className="box1" />, label: `1 box for £${price1}`, sublabel: '(250g)', value: '1', price: price1 },
      { img: <Box2 />, label: `2 boxes for £${price2}`, sublabel: '(250g)', value: '2', price: price2 },
      { img: <Box4 />, label: `4 boxes for £${price4}`, sublabel: '(250g)', value: '4', price: price4 },
    ],
    [
      { title: 'And how often would you like to receive it?', section: 'frequency' },
      { label: 'Weekly' },
      { label: 'Fortnightly' },
      { label: 'Monthly' },
    ],
    [
      { title: 'Finally, where in the world are you?', section: 'location' },
      { label: 'United Kingdom' },
      { label: 'Europe' },
      { label: 'Rest of World' },
    ],
  ];

  const values = {
    data,
    tableData,
    coffeeOrderData,
    setActiveAccordion,
    setActiveAccordionState,
    coffeeSelectionAnchor,
    moreInfoAnchor,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
