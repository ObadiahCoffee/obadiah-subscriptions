import React from 'react';
import './styles.scss';

const Section = props => {
  const { className, children } = props;
  return (
    <section className={`section ${className || ''}`}>
      <div className="wrapper">{children}</div>
    </section>
  );
};

export default Section;
