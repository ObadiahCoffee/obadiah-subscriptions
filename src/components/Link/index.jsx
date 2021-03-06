import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = (props) => {
  const {
    children,
    activeClassName,
    className,
    to,
    title,
    target = '_blank',
    tabIndex,
    ariaLabel,
    onClick = () => {},
    onMouseOver = () => {},
    onMouseOut = () => {},
  } = props;

  const isExternal = (to && to.indexOf('http') !== -1) || (to && to[0] === '#');

  const containsSiteUrl = process.env.SITE_URL && to && to.indexOf(process.env.SITE_URL) !== -1;

  if (isExternal && !containsSiteUrl) {
    return (
      <a
        href={to}
        className={className || ''}
        title={title || null}
        aria-label={ariaLabel || null}
        target={target}
        onClick={onClick}
        rel="nofollow noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  const withTrailingSlash = `${to}${to.endsWith('/') ? '' : '/'}`;
  const linkTo = containsSiteUrl ? withTrailingSlash.replace(containsSiteUrl, '') : withTrailingSlash;

  return (
    <GatsbyLink
      to={linkTo}
      aria-label={ariaLabel || null}
      activeClassName={activeClassName}
      className={className || ''}
      title={title || null}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      tabIndex={tabIndex}
    >
      {children}
    </GatsbyLink>
  );
};

export default Link;
