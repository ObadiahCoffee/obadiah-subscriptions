import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import './styles.scss';

/* eslint react/destructuring-assignment: 0 */
const Carousel = (props) => {
  const { children, containerClassName = 'carousel', sliderRef, settings } = props;
  const [hasSetSliderRef, setHasSetSliderRef] = useState(false);

  // Pass sliderRef to parent component
  const sliderElement = useRef(null);

  useEffect(() => {
    if (sliderRef && !hasSetSliderRef) {
      sliderRef(sliderElement?.current);
      setHasSetSliderRef(true);
    }
  }, [sliderRef, hasSetSliderRef]);

  return (
    <div className={containerClassName}>
      <Slider {...settings} ref={sliderRef ? sliderElement : null}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
