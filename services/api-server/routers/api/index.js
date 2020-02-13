const users = require('./users');
const cases = require('./cases');
const uploads = require('./uploads');

module.exports = app => {
  app.use('/api/v1/users', users);
  app.use('/api/v1/upload-cases', cases);
  app.use('/api/v1/uploads', uploads);
};
