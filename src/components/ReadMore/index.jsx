import React, { useContext, useState } from 'react';
import { Section, Image } from 'components';
import { ThemeContext } from '../../context/ThemeContext';
import * as styles from './styles.module.scss';

const ReadMore = () => {

  const { tableData } = useContext(ThemeContext);

  return (
    <Section>
      <div className={styles.mainContainer} >
        <div className={styles.imageContainer}>
          <Image image={tableData[0].readMoreImage} />
        </div>
        <div className={styles.wysiwyg} dangerouslySetInnerHTML={{__html: tableData[0].readMoreWYSIWIG}} />
      </div>
    </Section>
  )
};

export default ReadMore;
