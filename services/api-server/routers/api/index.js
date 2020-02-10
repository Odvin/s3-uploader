const users = require('./users');
const cases = require('./cases');

module.exports = app => {
  app.use('/api/v1/users', users);
  app.use('/api/v1/upload-cases', cases);
};
