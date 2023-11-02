import mongoose from 'mongoose';

export function connect() {
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.demzayt.mongodb.net/`)}