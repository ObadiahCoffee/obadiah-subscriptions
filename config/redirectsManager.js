const fs = require('fs');
const path = require('path');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

module.exports = (createRedirect, reporter) => {
  // Create Redirects
  const combinedRedirects = [...redirects, ...rewrites];

  combinedRedirects.map((redirect) =>
    createRedirect({ fromPath: redirect.source, toPath: redirect.destination, isPermanent: redirect.status !== 302 })
  );

  const netlifyRedirectsArr = combinedRedirects.map(
    (redirect) => `${redirect.source} ${redirect.destination.replace(/\*/g, ':splat')} ${redirect.status || '301!'}`
  );

  netlifyRedirectsArr.unshift('# Important: configure redirects in /config/redirects and /config/rewrites\n');

  const netlifyRedirects = netlifyRedirectsArr.join('\n');

  fs.writeFile(path.join(__dirname, '../static/_redirects'), netlifyRedirects, () =>
    reporter.info(`generated redirect files with ${redirects.length} redirects`)
  );
};
