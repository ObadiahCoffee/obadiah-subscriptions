import React from 'react';
import { Link } from 'components';
import './styles.scss';

const NoJs = () => (
  <noscript>
    <div className="no-js">
      For full functionality of this site it is necessary to enable JavaScript. Here are the{' '}
      <Link to="https://www.enable-javascript.com/" ariaLabel="Enable JS">
        instructions how to enable JavaScript in your web browser.
      </Link>
    </div>
  </noscript>
);

export default NoJs;
