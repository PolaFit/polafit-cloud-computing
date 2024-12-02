const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const bucketName = process.env.BUCKET_NAME;  

const storage = new Storage({ keyFilename });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };