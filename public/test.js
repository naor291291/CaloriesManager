const request = require('supertest');
const YourModel = require('../models/caloris'); // הכנס את מודל הקלוריות שלך

describe('POST /addcalories', () => {
    it('should add a new calorie consumption item', async () => {
        const newCalorieData = {
            user_id: 1,
            year: 2024,
            month: 6,
            day: 16,
            description: 'Test Meal',
            category: 'lunch',
            amount: 500
        };

        const response = await request(app)
            .post('/addcalories')
            .send(newCalorieData)
            .set('Accept', 'application/json');

        // בודק אם הבקשה הצליחה
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newCalorieData);

        // בדוק את הנתונים ב-MongoDB שלך כדי לוודא שנוסף הנתון בהצלחה
        const addedCalorie = await YourModel.findOne(newCalorieData);
        expect(addedCalorie).toBeDefined();
    });
});
