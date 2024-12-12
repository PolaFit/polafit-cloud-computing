const { pool } = require('../config/connection');
const { bucket } = require('../config/storage');
const { v4: uuidv4 } = require('uuid');

const storeFoodHistory = async (req, res) => {
    const { userId, name, serving, calories, protein, fat, carbs, fiber, sugar } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
    }

    try {
        const fileName = `${userId}/food-history/${uuidv4()}-${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype },
            public: true,
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const conn = await (await pool).getConnection();
        await conn.query(
            'INSERT INTO food_history (user_id, name, serving, calories, protein, fat, carbs, fiber, sugar, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [userId, name, serving, calories, protein, fat, carbs, fiber, sugar, publicUrl]
        );

        res.status(201).json({ message: 'Food history stored successfully', imageUrl: publicUrl });
        conn.release();
    } catch (error) {
        console.error('Error storing food history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getFoodHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const conn = await (await pool).getConnection();
        const [foodHistory] = await conn.query('SELECT * FROM food_history WHERE user_id = ?', [userId]);
        res.json(foodHistory);
        conn.release();
    } catch (error) {
        console.error('Error fetching food history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { storeFoodHistory, getFoodHistory };