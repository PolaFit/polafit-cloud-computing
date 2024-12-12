const multer = require('multer');
const { bucket } = require('../config/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image');

const uploadImageToCloudStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error('No file provided'));
        }

        const uniqueFileName = `profile/${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;

        const blob = bucket.file(uniqueFileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

const uploadPredictionToCloudStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error('No file provided'));
        }

        const uniqueFileName = `predictions/${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;

        const blob = bucket.file(uniqueFileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};


module.exports = { upload, uploadImageToCloudStorage, uploadPredictionToCloudStorage };
