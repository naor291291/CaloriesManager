const express = require('express');
const router = express.Router();
const Calorie = require('../models/caloris');

const setNoDataMessage = (category, data) => {
    return data.length ? data : `No data for '${category}'`;
};

router.get('/', async (req, res) => {
    try {
        const { user_id, year, month } = req.query;

        // בדיקה מקדימה של ערכי המחרוזת
        if (!user_id || !year || !month) {
            return res.status(400).json({ error: "Missing required query parameters: user_id, year, month" });
        }

        // המרה לסוג הנתונים המתאים
        const userId = Number(user_id);
        const yearInt = Number(year);
        const monthInt = Number(month);

        // בדיקת נתוני זמן
        if (isNaN(userId) || isNaN(yearInt) || isNaN(monthInt)) {
            return res.status(400).json({ error: "Invalid query parameters. Ensure 'user_id', 'year', and 'month' are valid numbers." });
        }

        // בדיקת תאריכים תקינים (למניעת תאריכים לא קיימים)
        if (monthInt < 1 || monthInt > 12) {
            return res.status(400).json({ error: "Invalid month. Month should be between 1 and 12." });
        }

        // יצירת תאריך תקין
        const date = new Date(yearInt, monthInt - 1, 1);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Invalid date parameters. Please check the year and month." });
        }

        // שאילתה לנתונים עם המרות מסודרות
        const calories = await Calorie.find({ user_id: userId, year: yearInt, month: monthInt });

        // יצירת דוח לפי קטגוריות
        const report = calories.reduce((acc, calorie) => {
            if (calorie.category in acc) {
                acc[calorie.category].push({
                    day: calorie.day,
                    description: calorie.description,
                    amount: calorie.amount
                });
            }
            return acc;
        }, { breakfast: [], lunch: [], dinner: [], other: [] });

        // טיפול בקטגוריות שאין בהם נתונים
        report.breakfast = setNoDataMessage('breakfast', report.breakfast);
        report.lunch = setNoDataMessage('lunch', report.lunch);
        report.dinner = setNoDataMessage('dinner', report.dinner);
        report.other = setNoDataMessage('other', report.other);

        // שליחת הדוח כ- JSON
        res.json(report);

    } catch (err) {
        // טיפול בשגיאות
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
