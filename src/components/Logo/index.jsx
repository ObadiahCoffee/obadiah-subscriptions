import React from 'react';
import { Link } from 'components';
import { siteName } from '../../../config/website';
import * as styles from './styles.module.scss';

const Logo = () => (
  <Link className={styles.logo} to="/">
    {siteName}
  </Link>
);

export default Logo;
