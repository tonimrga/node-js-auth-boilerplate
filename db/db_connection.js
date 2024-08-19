import { connect } from "mongoose";

export async function connectDB() {
    try {
        await connect(process.env.DB_URL);
        console.log("MongoDB connected.");
    } catch (e) {
        console.log('Error connecting to the database.', e);
    }
};