const {
  NODE_ENV,
  SERVER_PORT,
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  S3_PORT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  S3_PROTOCOL,
  S3_HOST,
  S3_REGION,
} = process.env;

module.exports = {
  serverPort: SERVER_PORT,
  mode: NODE_ENV,
  db: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PWD,
    name: DB_NAME,
  },
  S3Bucket: {
    host: S3_HOST,
    port: S3_PORT,
    bucket: S3_BUCKET,
    protocol: S3_PROTOCOL,
    region: S3_REGION,
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
};
