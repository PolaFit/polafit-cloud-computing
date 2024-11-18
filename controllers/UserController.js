const fs = require('fs');
const path = require('path');
const { pool } = require('../config/connection');

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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phone } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            conn.release();
            return res.status(404).json({ message: 'User not found' });
        }

        const currentUser = user[0];

        if (image && currentUser.image) {
            const filePath = path.join(__dirname, '..', 'uploads', currentUser.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        const updatedUsername = username || currentUser.username;
        const updatedEmail = email || currentUser.email;
        const updatedPhone = phone || currentUser.phone;
        const updatedImage = image || currentUser.image;

        await conn.query(
            'UPDATE users SET username = ?, email = ?, phone = ?, image = ? WHERE id = ?',
            [updatedUsername, updatedEmail, updatedPhone, updatedImage, id]
        );

        res.json({
            message: 'User updated successfully',
            user: {
                id,
                username: updatedUsername,
                email: updatedEmail,
                phone: updatedPhone,
                image: updatedImage,
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
