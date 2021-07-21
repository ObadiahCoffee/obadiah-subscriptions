import React, { useState, useEffect } from 'react';
import { use100vh } from 'react-div-100vh';
import { navigate } from 'gatsby';
import { Link, Hamburger } from 'components';
import { ReactComponent as Logo } from '../../images/obadiah_coffee_logo.svg';
import * as styles from './styles.module.scss';

const links = [
  {
    to: 'https://obadiah-coffee.myshopify.com/pages/shop',
    text: 'Coffees',
    className: `${styles.link}`,
    activeClassName: `${styles.linkActive}`,
  },
  { to: '/#subscription', text: 'Subscription', className: `${styles.link}`, activeClassName: `${styles.linkActive}` },
  {
    to: 'https://obadiah-coffee.myshopify.com/pages/wholesale',
    text: 'Wholesale',
    className: `${styles.link}`,
    activeClassName: `${styles.linkActive}`,
  },
  {
    to: `${process.env.GATSBY_SHOP_SIGN_IN_URL}`,
    text: 'Sign In',
    className: `${styles.link}`,
    activeClassName: `${styles.linkActive}`,
  },
  {
    to: 'https://obadiah-coffee.myshopify.com/pages/contact',
    text: 'Contact',
    className: `${styles.link}`,
    activeClassName: `${styles.linkActive}`,
  },
  {
    to: `https://${process.env.GATSBY_SHOP_URL}/cart`,
    text: 'Cart',
    className: `${styles.cartLink}`,
    activeClassName: `${styles.linkActive}`,
  },
];

const Header = ({ location }) => {
  const [active, setActive] = useState(1);
  const [showNavBurger, setShowNavBurger] = useState(false);
  const [scrollTop, setScrollTop] = useState(0); // set pixels to - from top when shownav = false
  const [bodyLocked, setBodyLock] = useState(false); // lock body while show nav = true

  /// H A M B U R G E R   L O G I C /////////////////////

  // toggle main nav links for mobile
  const toggleNav = (event) => {
    event.preventDefault();
    setShowNavBurger(!showNavBurger);
  };

  // C L O S E   O N   E S C   A N D   B O D Y   L O C K
  const handleEscKey = (event) => {
    // get rid of nav on esc keydown
    if (event.keyCode === 27) {
      document.body.classList.remove('nav-open');
      setShowNavBurger(false);
    }
  };

  const lockBody = () => {
    // lock body while show nav true
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    setScrollTop(scrollPosition);
    // document.body.style.top = `-${scrollPosition}px`;
    document.body.style.top = `0px`;
    document.body.classList.add('nav-open');
    setBodyLock(true);
  };

  const unlockBody = () => {
    // when show nav false, unlock body
    document.body.classList.remove('nav-open');
    document.body.style.top = '0px';
    window.scrollTo(0, scrollTop);
    setScrollTop(0);
    setBodyLock(false);
  };

  // use effect exit menu on sec keydown
  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    return () => {
      unlockBody();
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // use effect when shownav updated
  useEffect(() => {
    if (showNavBurger && !bodyLocked) lockBody();
    if (!showNavBurger && bodyLocked) unlockBody();
  }, [showNavBurger]);

  // close nav if current page is selected from nav
  const handleClick = (event, link) => {
    event.preventDefault();
    if (location?.pathname === link) {
      setShowNavBurger(false);
    } else {
      navigate(link);
    }
  };

  // toggle visibility for mobile
  const hamburgerOpenClass = showNavBurger ? styles.hamburgerOpen : undefined;

  const height = use100vh();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container} ${hamburgerOpenClass}`} style={showNavBurger ? { height } : {}}>
        <Logo className={styles.logo} />
        <nav className={styles.nav}>
          <div className={styles.linksContainer}>
            {links.map((link, index) => {
              const isActive = active === index;
              return (
                <Link
                  key={link.text}
                  className={`${link.className} ${active === index ? link.activeClassName : undefined}` || ''}
                  to={link.to}
                  onClick={() => setActive(index)}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className={styles.navRightContainer}>
          <Link className={styles.cart} to={`https://${process.env.GATSBY_SHOP_URL}/cart`}>
            Cart
          </Link>
          <Hamburger onClick={toggleNav} active={showNavBurger} className={styles.hamburger} />
        </div>
      </div>
    </header>
  );
};

export default Header;
