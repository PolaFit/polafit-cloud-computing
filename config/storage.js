const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const keyFilename = "../polafit-443507-e984791db3ea.json";
const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;  

const storage = new Storage({ keyFilename, projectId });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };