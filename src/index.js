// 1. Load Environment Variables
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// 2. Import app and DB connection
import app from "./app.js";               // <-- YOUR ROUTES ARE HERE
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 8000;

// 3. Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port: ${PORT}`);
    });

  } catch (error) {
    console.error("🔥 DATABASE CONNECTION FAILED!!!", error);
    process.exit(1);
  }
};

startServer();
