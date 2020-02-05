const config = {
  servicePort: process.env.API_SERVER_PORT,
  db: {
    host: process.env.MONGO_SERVER_HOST,
    replicaHost: process.env.MONGO_SERVER_HOST_REPLICA,
    port: process.env.MONGO_SERVER_PORT,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  },
  s3: {
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_KEY
  }
};

const mongoConfig = {
  // connectionPath: `mongodb://${config.db.host}:27017/${config.db.database}`,
  connectionPath: `mongodb://${config.db.host}:27017,${config.db.replicaHost}:27017/${config.db.database}?replicaSet=rs0`,
  options: config.db.options
};


module.exports = {
  config,
  mongoConfig
};
