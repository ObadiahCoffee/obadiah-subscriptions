import React from 'react';
import { Link } from 'gatsby';
import { Layout } from 'components';
import FourOhFourImage from 'images/404.svg';
import { container, image, content } from './404.module.scss';

const FourOhFour = ({ location }) => (
  <Layout location={location}>
    <div className={`container ${container}`}>
      <img className={image} src={FourOhFourImage} alt="Opps this page has gone missing" />
      <div className={content}>
        <h2>404 Not found</h2>
        <Link className="button" to="/">
          Go back home
        </Link>
      </div>
    </div>
  </Layout>
);

export default FourOhFour;
