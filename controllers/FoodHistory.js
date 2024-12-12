const { pool } = require('../config/connection');
const { uploadPredictionToCloudStorage } = require('../middleware/MulterConfig');

const storeFoodHistory = async (req, res) => {
    const { userId, foodName, serving, calories, protein, fat, carbs, fiber, sugar } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No image file provided' });
    }

    try {
        const publicUrl = await uploadPredictionToCloudStorage(file);
        const conn = await (await pool).getConnection();
        await conn.query(
            'INSERT INTO food_history (user_id, name, serving, calories, protein, fat, carbs, fiber, sugar, image) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [userId, foodName, serving, calories, protein, fat, carbs, fiber, sugar, publicUrl]
        );
        conn.release();

        res.status(201).json({ 
            message: 'Prediction result stored successfully', 
            imageUrl: publicUrl 
        });
    } catch (error) {
        console.error('Error storing prediction result:', error);
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