const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const developers = [
            { firstname: 'Naor', lastname: 'Abudi', id: 203571039, email: 'naor2912@gmail.com' },
            { firstname: 'Adi---', lastname: 'Malka', id: 315426684, email: 'adimalka14@gmail.com' }
        ];
        res.json(developers);
    } catch (err) {
        console.error('Error retrieving about data:', err); //
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
///
