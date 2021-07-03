import React from 'react';
import { Link, Logo } from 'components';
import * as styles from './styles.module.scss';

const links = [{ to: '/goodbye', text: 'Cart', className: `button ${styles.button}` }];
const Header = () => (
  <header className={styles.header}>
    <div className={`container ${styles.container}`}>
      <h1 className={styles.logo}>Obadiah Coffee</h1>
      <nav className={styles.nav}>
        {/* links.map((link) => (
            <Link key={link.text} className={link.className || ''} to={link.to}>
              {link.text}
            </Link>
          )) */}
        <Link className={styles.cart} to={`${process.env.GATSBY_SHOPIFY_URL}/cart`}>
          Cart
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
