import React from 'react';
import * as styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.container}`}>
      <div className={styles.sitemap}>Obadiah Coffee © {new Date().getFullYear()}</div>
    </div>
  </footer>
);

export default Footer;
