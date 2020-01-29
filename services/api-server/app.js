const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routers/api');
const maintenance = require('./routers/maintenance');
const error = require('./routers/error');

const app = express();

app.use(cors());
app.use(bodyParser.json());

api(app);
maintenance(app);
error(app);

module.exports = app;