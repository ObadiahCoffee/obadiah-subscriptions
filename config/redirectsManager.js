const fs = require('fs');
const path = require('path');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

module.exports = (createRedirect, reporter) => {
  // Create Redirects
  const combinedRedirects = [...redirects, ...rewrites];

  // Gatsby Cloud et al
  combinedRedirects.map((redirect) =>
    createRedirect({ fromPath: redirect.source, toPath: redirect.destination, isPermanent: redirect.status !== 302 })
  );

  // Netlify

  const netlifyRedirectsArr = combinedRedirects.map(
    (redirect) => `${redirect.source} ${redirect.destination.replace(/\*/g, ':splat')} ${redirect.status || '301!'}`
  );

  netlifyRedirectsArr.unshift('# Important: configure redirects in /config/redirects and /config/rewrites\n');

  const netlifyRedirects = netlifyRedirectsArr.join('\n');

  fs.writeFile(path.join(__dirname, '../static/_redirects'), netlifyRedirects, () => {});

  // Vercel

  const vercelObj = {
    trailingSlash: true,
    redirects: redirects.map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: !redirect.status || redirect.status === 301,
    })),
    rewrites: rewrites.map((rewrite) => ({
      source: rewrite.source,
      destination: rewrite.destination,
    })),
    headers: [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
    ],
  };

  fs.writeFile(path.join(__dirname, '../vercel.json'), JSON.stringify(vercelObj, null, 2), () =>
    reporter.info(`generated redirect files with ${combinedRedirects.length} redirects`)
  );
};
