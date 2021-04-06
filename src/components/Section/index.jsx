import React from 'react';
import './styles.scss';

const isDev = process.env.NODE_ENV === 'development';

const Section = (props) => {
  const { className, containerClassName, children, sliceName } = props;
  return (
    <section className={`section ${className || ''}`} data-slice={isDev ? sliceName : null}>
      <div className={`container ${containerClassName || ''}`}>{children}</div>
    </section>
  );
};

export default Section;
