const multer = require('multer');
const { bucket } = require('../config/storage');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image');

const uploadImageToCloudStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error('No file provided'));
        }

        // Buat nama file yang unik
        const fileName = `${Date.now()}-${file.originalname}`;
        const blob = bucket.file(fileName);
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

module.exports = { upload, uploadImageToCloudStorage };
