import React from 'react';
import './styles.scss';

const Hamburger = ({ onClick, active, themeClass, hasScrolled, className }) => {
  const menuText = active ? 'Close' : 'Menu';

  return (
    <button
      type="button"
      className={`hamburger-container ${themeClass || ''} ${hasScrolled ? 'scrolled' : ''} ${className || ''}`}
      onClick={onClick}
    >
      <span className={`hamburger ${active ? 'active' : ''}`}>{menuText}</span>
    </button>
  );
};

export default Hamburger;
