const { Storage } = require('@google-cloud/storage');
const path = require('path');

const keyFilename = path.join(__dirname, 'path/to/your/service-account-key.json');

const bucketName = 'your-bucket-name';

const storage = new Storage({ keyFilename });
const bucket = storage.bucket(bucketName);

module.exports = { bucket };
