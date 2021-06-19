import React from 'react';
import { Image } from 'components';
import * as styles from './styles.module.scss';

const ReadMore = ({ tableData }) => {

  console.log(tableData)

  return (
    <div className={styles.mainContainer} >
    <span>{tableData.readMoreWYSIWIG}</span>
    </div>
  );

}

export default ReadMore;
