// --------------------
// Create pages
// --------------------

// GraphQL queries aliases - must have - the
// same name as their respective templates

// Function to create pages
const pagesCreator = (createPage, data) => {
  Object.keys(data).forEach((key) => {
    const component = `${__dirname}/src/templates/${key}.jsx`;
    if (!component)
      return console.log('\x1b[41m%s\x1b[0m', `Missing ${component} template in gatsby-node.js pagesCreator`);

    const { slugs } = data[key];

    if (!slugs || slugs.length < 1) return null;

    if (!slugs.find((uid) => uid === 'home')) {
      throw Error('Create page with slug home');
    }

    // Page
    if (key === 'page') {
      return slugs.forEach((uid) => {
        const pageSlug = uid === 'home' ? '/' : `/${uid}/`;
        createPage({ path: pageSlug, component, context: { uid } });
      });
    }

    console.log('\x1b[41m%s\x1b[0m', `Missing ${key} type in gatsby-node.js pagesCreator`);
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Get all pages
  const { data } = await graphql(`
    {
      page: allPrismicPage {
        slugs: distinct(field: uid)
      }
    }
  `);

  // Create Pages
  pagesCreator(createPage, data);
};
