const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calorieSchema = new Schema({
    user_id: { type: Number, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['breakfast', 'lunch', 'dinner', 'other'] },
    amount: { type: Number, required: true }
});

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;
