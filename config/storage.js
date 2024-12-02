const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;  

const storage = new Storage({ projectId });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };
