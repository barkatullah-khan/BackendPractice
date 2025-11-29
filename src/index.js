// src/index.js

// 1. Load Environment Variables (do this FIRST)
import dotenv from "dotenv";
dotenv.config({
    // Correctly setting the path to the .env file in the root directory
    path: './.env' 
});

// 2. Import necessary modules
import express from 'express'; // Assuming Express is installed
import connectDB from './config/database.js'; // Assuming connectDB is in a file named database.js in a config folder

// 3. Create the Express App instance
const app = express();
const PORT = process.env.PORT || 8000; // Use port from .env or default to 8000

/**
 * 4. The main function to connect the DB and start the server.
 * This ensures the server only listens when the database is ready.
 */
const startServer = async () => {
    try {
        // A. Wait for the MongoDB connection to complete
        await connectDB(); 

        // B. Add listeners for Express server errors (good practice)
        app.on("error", (error) => {
            console.error("❌ Express Server Error:", error);
            process.exit(1); // Exit if the server encounters a critical error
        });
        
        // C. Start listening for incoming requests
        app.listen(PORT, () => {
            console.log(`🚀 Server is listening on port: ${PORT}`);
           
        });

    } catch (error) {
        // If connectDB() fails, the error will be caught here
        console.error("🔥 DATABASE CONNECTION FAILED!!!", error);
        process.exit(1); // Exit if the database connection fails
    }
}

// Execute the main startup function
startServer();