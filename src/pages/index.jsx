import React, { useEffect, useState } from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import { useStaticQuery, graphql } from 'gatsby';
import { Header, Footer, Landing, CoffeeDetails, ReadMore, CoffeeOrder, Cart, MoreInfo, SEO } from 'components';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/Cart';
import '../sass/global/styles.scss';
import * as styles from './styles.module.scss';

const Homepage = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [blockScroll, setBlockScroll] = useState(false);
  const [sections, setSections] = useState(false);

  const seoQuery = graphql`
    query {
      ...seoData
    }
  `;

  const { prismicHome } = useStaticQuery(seoQuery);

  const { data } = prismicHome;
  const { meta_title: metaTitle, meta_description: metaDesc, open_graph_image: ogImage, schema } = data;

  const seo = {
    title: metaTitle.text,
    desc: metaDesc.text,
    banner: ogImage && ogImage.url,
    schema: schema.text,
  };

  useEffect(() => {
    const sectionEls = document.getElementsByClassName('anchor');
    setSections(sectionEls);

    const topOfPage = document.getElementById('mainContainer');
    scrollIntoView(topOfPage, { block: 'start' });
  }, []);

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('mousewheel', handleScroll, { passive: false });
    };
  }, [activeSectionIndex, blockScroll]);

  useEffect(() => {
    if (blockScroll) {
      setTimeout(() => {
        setBlockScroll(false);
      }, 500);
    }
  }, [blockScroll]);

  const handleScroll = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    if (deltaY > 30 && !blockScroll) {
      goToSection();
    }
    if (deltaY < -30 && activeSectionIndex > 0 && !blockScroll) {
      goToSection(true);
    }
  };

  const goToSection = (prev) => {
    setBlockScroll(true);
    const indexToUse = activeSectionIndex || 0;
    const newActiveSectionIndex = prev ? indexToUse - 1 : indexToUse + 1;
    const nextSection = sections[newActiveSectionIndex];
    if (nextSection) {
      scrollIntoView(sections[newActiveSectionIndex], {
        ease: (t) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2,
        block: 'start',
        inline: 'center',
      });
      setActiveSectionIndex(newActiveSectionIndex);
    }
  };

  const goToNextSection = (event) => {
    event.preventDefault();
    const parent = event.target.closest('.anchor');
    const indexOf = [...sections].indexOf(parent);
    const newActiveSectionIndex = indexOf + 1;
    const nextSection = sections[newActiveSectionIndex];
    if (nextSection) {
      scrollIntoView(sections[newActiveSectionIndex], {
        ease: (t) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2,
        block: 'start',
        inline: 'center',
      });
      setActiveSectionIndex(newActiveSectionIndex);
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <SEO {...seo} />
        <div className={styles.mainContainer} id="mainContainer">
          <MoreInfo />
          <Header />
          <Landing goToNextSection={goToNextSection} />
          <CoffeeDetails />
          <ReadMore />
          <CoffeeOrder goToNextSection={goToNextSection} />
          <Cart />
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default Homepage;
