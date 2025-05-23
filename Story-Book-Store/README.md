# BookStore Application

A MERN stack application for a bookstore with user authentication and book listing features.

## Project Structure

- **Frontend**: React application built with Vite
- **Backend**: Express.js API with MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB:
   - For local MongoDB: Uncomment the local MongoDB URI in `.env` file
   - For MongoDB Atlas: 
     1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
     2. Create a new cluster
     3. Create a database user with read/write permissions
     4. Get your connection string from MongoDB Atlas
     5. Update the `.env` file with your connection string

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication (signup, login, logout)
- Book listing
- Categorized book display
- Responsive design

## API Endpoints

### User Routes

- `POST /user/signup`: Register a new user
- `POST /user/login`: Login a user

### Book Routes

- `GET /book`: Get all books

## Technologies Used

### Frontend
- React
- React Router
- Axios
- React Hook Form
- React Hot Toast
- Tailwind CSS
- DaisyUI

### Backend
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- dotenv for environment variables
- cors for cross-origin resource sharing

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Check if your MongoDB service is running (if using local MongoDB)
2. Verify your MongoDB Atlas credentials (if using MongoDB Atlas)
3. Make sure your IP address is whitelisted in MongoDB Atlas
4. Check the MongoDB connection string in the `.env` file

### API Connection Issues

If the frontend cannot connect to the backend:

1. Ensure the backend server is running
2. Check that the port in the backend `.env` file matches the port in the frontend API configuration
3. Verify that CORS is properly configured in the backend

## License

ISC
#   S t o r y - B o o k - s t o r e  
 