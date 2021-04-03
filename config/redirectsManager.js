const fs = require('fs');
const path = require('path');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = (createRedirect, reporter) => {
  const { HOST } = process.env;

  const useAll = !HOST;
  const useVercel = HOST === 'vecel' || useAll;
  const useNetlify = HOST === 'netlify' || useAll;
  const useOther = (!useVercel && !useNetlify) || useAll;

  // Combine redirects and writes
  const combinedRedirects = [...redirects, ...rewrites];

  const reporterMsg = `generated redirect files with ${combinedRedirects.length} redirects`;

  // Generate redirects for AWS / Gatsby Cloud / etc
  if (useOther) {
    combinedRedirects.map((redirect) =>
      createRedirect({
        fromPath: redirect.source,
        toPath: redirect.destination,
        isPermanent: !redirect.status || redirect.status === 301,
      })
    );

    if (!useAll) {
      reporter.info(reporterMsg);
    }
  }

  // Generate _redirects file for Netlify
  if (useNetlify) {
    const netlifyRedirectsArr = combinedRedirects.map(
      (redirect) => `${redirect.source} ${redirect.destination.replace(/\*/g, ':splat')} ${redirect.status || '301!'}`
    );

    netlifyRedirectsArr.unshift('# Important: configure redirects in /config/redirects and /config/rewrites\n');

    const netlifyRedirects = netlifyRedirectsArr.join('\n');

    fs.writeFile(path.join(__dirname, '../static/_redirects'), netlifyRedirects, () => {
      if (!useAll) {
        reporter.info(reporterMsg);
      }
    });
  }

  // Generate vercel.json file for Vercel
  if (useVercel) {
    const vercelObj = {
      trailingSlash: true,
      redirects: redirects.map((redirect) => ({
        source: redirect.source.replace(/\*/g, '(.*)'),
        destination: redirect.destination.replace(/\*/g, '$1'),
        permanent: !redirect.status || redirect.status === 301,
      })),
      rewrites: rewrites.map((rewrite) => ({
        source: rewrite.source.replace(/\*/g, '(.*)'),
        destination: rewrite.destination.replace(/\*/g, '$1'),
      })),
      headers: [
        {
          source: '/(.*)',
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
        },
      ],
    };

    fs.writeFile(path.join(__dirname, '../static/vercel.json'), JSON.stringify(vercelObj, null, 2), () =>
      reporter.info(reporterMsg)
    );
  }
};
