import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const URI = process.env.MongoDBURI;
console.log('Attempting to connect to MongoDB...');
console.log('Connection string:', URI);

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  });
