const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const path = require('path');

const keyFilename = path.join(__dirname, '../polafit-443507-e984791db3ea.json');;
const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;  

const storage = new Storage({ keyFilename, projectId });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };