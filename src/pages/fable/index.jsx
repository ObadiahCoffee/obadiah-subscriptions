import React, { useState } from 'react';
import { Logo } from 'components';
import sliceComponents from 'slices';
import sliceFables from 'slices/fables';
import {
  container,
  content,
  sidebar,
  sidebarLogo,
  sidebarItems,
  sidebarItem,
  sidebarLink,
  sidebarLinkActive,
  sidebarSublink,
  sidebarSublinkActive,
  sidebarArrow,
  sidebarArrowActive,
} from './fable.module.scss';

const Fable = () => {
  const fableKeysArr = Object.keys(sliceFables);

  const [activeComp, setActiveComp] = useState(0);
  const [activeVariation, setActiveVariation] = useState(0);

  const activeCompKey = fableKeysArr[activeComp];

  const Component = sliceComponents[activeCompKey];
  const data = sliceFables[activeCompKey];

  const variationData = data?.variations?.[activeVariation];

  const handleCompChange = (event, index) => {
    event.preventDefault();
    setActiveComp(index);
    setActiveVariation(0);
  };

  const handleVariationChange = (event, index) => {
    event.preventDefault();
    setActiveVariation(index);
  };

  return (
    <div className={container}>
      <div className={sidebar}>
        <div className={sidebarLogo}>
          <Logo />
        </div>
        <div className={sidebarItems}>
          {fableKeysArr.map((sliceName, index) => {
            const isActive = activeComp === index;
            const dataArr = sliceFables[sliceName];
            return (
              <div key={sliceName} className={sidebarItem}>
                <a
                  href="#comp"
                  className={`${sidebarLink} ${isActive ? sidebarLinkActive : ''}`}
                  onClick={(event) => handleCompChange(event, index)}
                >
                  {dataArr.name || sliceName}
                </a>
                {isActive && (
                  <div>
                    {dataArr.variations.map((variation, variationIndex) => {
                      const variationActive = activeVariation === variationIndex;
                      return (
                        <a
                          href="#type"
                          className={`${sidebarSublink} ${variationActive ? sidebarSublinkActive : ''}`}
                          key={variation.title || index}
                          onClick={(event) => handleVariationChange(event, variationIndex)}
                        >
                          <span className={variationActive ? sidebarArrowActive : sidebarArrow}>&#8627;</span>{' '}
                          {variation.title || 'Default Variation'}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={content}>
        <Component {...variationData.props} />
      </div>
    </div>
  );
};

export default Fable;
