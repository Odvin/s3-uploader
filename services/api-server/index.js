const app = require('./app');
require('./models');
require('./redis');

const {
  config: { servicePort }
} = require('./config');

app.listen(servicePort, () =>
  console.log(`🚀 :: API service is running on port :: ${servicePort}`)
);