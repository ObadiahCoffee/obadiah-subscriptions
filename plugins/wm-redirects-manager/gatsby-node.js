const fs = require('fs');
const path = require('path');

exports.createPages = async ({ actions, reporter }, pluginOptions) => {
  const { createRedirect } = actions;

  const { redirects, rewrites, host } = pluginOptions;

  if (!redirects || !rewrites || !Array.isArray(redirects) || !Array.isArray(rewrites)) {
    reporter.warn(`No redirects or rewrites passed to wm-redirects-manager`);
    return null;
  }

  // Delete stale redirect files from public
  if (fs.existsSync(path.join(__dirname, '../../public/vercel.json'))) {
    reporter.verbose('successfully deleted stale vercel.json');
    fs.unlinkSync(path.join(__dirname, '../../public/vercel.json'));
  }
  if (fs.existsSync(path.join(__dirname, '../../public/_redirects'))) {
    reporter.verbose('successfully deleted stale _redirects');
    fs.unlinkSync(path.join(__dirname, '../../public/_redirects'));
  }

  // Configure host options
  const useAll = !host;
  const useVercel = host === 'vecel' || useAll;
  const useNetlify = host === 'netlify' || useAll;
  const useOther = (!useVercel && !useNetlify) || useAll;

  // Combine redirects and writes
  const combinedRedirects = [...redirects, ...rewrites];

  // Bootstrap reporter response
  const reporterMsg = `generated ${combinedRedirects.length} redirects`;

  // Generate redirects for AWS / Gatsby Cloud / etc
  if (useOther) {
    combinedRedirects.map((redirect) => {
      const isPermanent = !redirect.status || redirect.status === 301;
      reporter.verbose(
        `${isPermanent ? 'Permanently' : 'Temporarily'} redirecting ${redirect.source} to ${redirect.destination}`
      );

      if (redirect.source.indexOf('http') !== -1) {
        reporter.warn(`Absolute redirect source URLs only work with Netlify, ignoring ${redirect.source}`);
        return null;
      }

      return createRedirect({
        fromPath: redirect.source,
        toPath: redirect.destination,
        isPermanent: !redirect.status || redirect.status === 301,
      });
    });

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

    fs.writeFile(path.join(__dirname, '../../static/_redirects'), netlifyRedirects, () => {
      if (!useAll) {
        reporter.info(reporterMsg);
      }
    });
  }

  // Generate vercel.json file for Vercel
  if (useVercel) {
    const vercelObj = {
      trailingSlash: true,
      redirects: redirects.map((redirect) => {
        if (redirect.source.indexOf('http') !== -1) {
          reporter.warn(`Vercel: Absolute redirect source URLs only work with Netlify, ignoring ${redirect.source}`);
          return null;
        }

        return {
          source: redirect.source.replace(/\*/g, '(.*)'),
          destination: redirect.destination.replace(/\*/g, '$1'),
          permanent: !redirect.status || redirect.status === 301,
        };
      }),
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

    fs.writeFile(path.join(__dirname, '../../static/vercel.json'), JSON.stringify(vercelObj, null, 2), () =>
      reporter.info(reporterMsg)
    );
  }
};
