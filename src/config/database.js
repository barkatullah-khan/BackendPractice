import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // 1. Establish the connection using the URI from environment variables
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        );

        // 2. Log success message using the connection details
        console.log(`\n✅ MongoDB connected succesfully!`);
 
    } catch (error) {
        // 3. Log the error and exit the process on failure
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;