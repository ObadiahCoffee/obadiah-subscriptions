import React from 'react';
import { Logo } from 'components';
import * as styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.container}`}>
      <Logo />
      <div className={styles.sitemap}>© Copyright {new Date().getFullYear()}</div>
    </div>
  </footer>
);

export default Footer;
