import React from 'react';
import { Logo, Navigation } from 'components';
import './styles.scss';

const navigationLinks = [{ to: '/goodbye', text: 'Goodbye', className: '' }];

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <Logo />
      <Navigation classNamePrefix="header" links={navigationLinks} />
    </div>
  </header>
);

export default Header;
