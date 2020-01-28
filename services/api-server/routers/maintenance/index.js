module.exports = app => {
  app.use('/healthcheck', require('./healthcheck'));
  app.use('/seeds', require('./seeds'));
};
