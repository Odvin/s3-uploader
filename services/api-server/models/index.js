const mongoose = require('mongoose');

const {
  mongoConfig: { connectionPath, options }
} = require('../config');


const user = require('./users');
const upload = require('./upload');

mongoose.connect(connectionPath, options);

mongoose.connection.on('connected', () => {
  console.info('Mongoose connected with pid', process.pid);
});

mongoose.connection.on('error', e => {
  console.error(`Mongoose connection ERROR :: ${e}`);
});

mongoose.connection.on('disconnected', () => {
  console.info('mongoose disconnected');
});

module.exports = {
  user,
  upload,
  connection: mongoose.connection
};
