import { connect } from "mongoose";

const URL = process.env.DB_URL ?? "mongodb://localhost:27017/";

export const connectDB = async () => {
    connect(URL)
        .then(() => console.log("DB connected."))
        .catch((error) => {
            console.log("Error connecting to MongoDB:", error.message);
            process.exit(1);
        });
};