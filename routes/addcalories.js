const express = require('express');
const router = express.Router();
const Calorie = require('../models/caloris');

router.post('/', (req, res) => {  // שים לב שהנתיב הוא '/' כי הראוטר כבר מוגדר עם /addcalories ב-app.js
    console.log('POST /addcalories', req.body);
    const { user_id, year, month, day, description, category, amount } = req.body;

    const calorie = new Calorie({ user_id, year, month, day, description, category, amount });

    calorie.save()
        .then(savedCalorie => {
            console.log('Calorie saved:', savedCalorie);
            res.status(201).json(savedCalorie);
        })
        .catch(err => {
            console.error('Error saving calorie:', err);
            res.status(400).json({ error: err.message });
        });
});

router.get('/', (req, res) => {
    res.status(405).send('GET method not allowed on /addcalories');
});

module.exports = router;
