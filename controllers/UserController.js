const { pool } = require('../config/connection');
const { bucket } = require('../config/storage');
const { format } = require('util');

const getUsers = async (req, res) => {
    try {
        const conn = await (await pool).getConnection();
        const [users] = await conn.query('SELECT * FROM users');
        res.json(users);
        conn.release();
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const conn = await (await pool).getConnection();
        const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user[0]);
        conn.release();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const uploadImageToCloudStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
        }

        const blob = bucket.file(file.filename);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phone } = req.body;

    try {
        const conn = await (await pool).getConnection();
        const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            conn.release();
            return res.status(404).json({ message: 'User not found' });
        }

        const currentUser = user[0];
        let updatedImageUrl = currentUser.image;

        if (req.file) {
            updatedImageUrl = await uploadImageToCloudStorage(req.file);
        }

        const updatedUsername = username || currentUser.username;
        const updatedEmail = email || currentUser.email;
        const updatedPhone = phone || currentUser.phone;

        await conn.query(
            'UPDATE users SET username = ?, email = ?, phone = ?, image = ? WHERE id = ?',
            [updatedUsername, updatedEmail, updatedPhone, updatedImageUrl, id]
        );

        res.json({
            message: 'User updated successfully',
            user: {
                id,
                username: updatedUsername,
                email: updatedEmail,
                phone: updatedPhone,
                image: updatedImageUrl,
            },
        });

        conn.release();
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser
};
