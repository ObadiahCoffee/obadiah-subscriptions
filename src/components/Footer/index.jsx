import React from 'react';
import { Logo } from 'components';
import * as styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`wrapper ${styles.footerWrapper}`}>
      <Logo />
      <div className={styles.sitemap}>
        <span className={styles.legal}>© Copyright {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);

export default Footer;
