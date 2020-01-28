const unhandledRouters = require('./unhandled');
const handleErrors = require('./handler');

module.exports = app => {
  app.use(unhandledRouters);
  app.use(handleErrors);
};