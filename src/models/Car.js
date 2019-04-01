import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CarSchema = mongoose.Schema({
    name: String
});

const Car = mongoose.model('cars', CarSchema);

export default Car;