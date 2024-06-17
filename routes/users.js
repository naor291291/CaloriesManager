const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', async (req, res) => {
    const userId = req.query.id;
    if (!userId) {
        return res.status(400).send('ID not provided');
    }

    try {
        const user = await User.findOne({ id: Number(userId) });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user information:', err); // לוג של השגיאה
        res.status(500).json({ error: err.message });
    }
});

router.get('/about', (req, res) => {
    try {
        const developers = [
            { firstname: 'Naor', lastname: 'Abudi', id: 203571039, email: 'naor2912@gmail.com' },
            { firstname: 'Adi', lastname: 'Malka', id: 315426684, email: 'adimalka14@gmail.com'}
        ];
        res.json(developers);
    } catch (err) {
        console.error('Error retrieving about data:', err); // לוג של השגיאה
        res.status(500).json({ error: err.message });
    }
});

router.use((req, res, next) => {
    res.status(404).send('Not Found');
});

module.exports = router;
