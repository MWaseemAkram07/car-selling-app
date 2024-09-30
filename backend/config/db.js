const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the function using module.exports
module.exports = connectDB;
