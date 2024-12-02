const { Storage } = require('@google-cloud/storage');
const path = require('path');

const keyFilename = path.join(__dirname, '../polafit-webservice.json');

const bucketName = 'polafit-bucket';

const storage = new Storage({ keyFilename });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };
