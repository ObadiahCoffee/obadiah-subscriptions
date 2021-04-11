const context = require.context('./', true, /\.\/[^/]+\/fable\.js$/);

context.keys().forEach((filePath) => {
  // Remove the './' and './svg' from the object key
  const componentName = filePath.replace(/^.+\/([^/]+)\/fable\.js/, '$1');
  module.exports[componentName] = context(filePath).default;
});
