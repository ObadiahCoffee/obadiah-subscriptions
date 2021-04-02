import React from 'react';
import { Section } from 'components';
import * as styles from './styles.module.scss';

const IntroSection = (props) => {
  const { data } = props;
  const { primary } = data;
  const { title, subtitle } = primary;
  return (
    <Section wrapperClassName={styles.container} sliceName="IntroSection">
      <h1>{title.text}</h1>
      <p dangerouslySetInnerHTML={{ __html: subtitle.html }} />
    </Section>
  );
};

export default IntroSection;
