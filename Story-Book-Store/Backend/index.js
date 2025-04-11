import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.error("MongoDB Connection Error: ", error);
        return false;
    }
};

// Try to connect to MongoDB
connectDB().then(connected => {
    if (!connected) {
        console.log("Warning: Running without database connection. Some features may not work.");
        console.log("Please check your MongoDB connection string in the .env file.");
    }
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});