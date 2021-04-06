import React from 'react';
import { Link, Logo } from 'components';
import * as styles from './styles.module.scss';

const links = [{ to: '/goodbye', text: 'Goodbye', className: `button ${styles.button}` }];

const Header = () => (
  <header className={styles.header}>
    <div className={`container ${styles.container}`}>
      <Logo />
      <nav className={styles.navigation}>
        {links.map((link) => (
          <Link key={link.text} className={`${styles.link || ''} ${link.className || ''}`} to={link.to}>
            {link.text}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
