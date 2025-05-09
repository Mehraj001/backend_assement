# Activity Booking App - Backend

A simple REST API backend for a "Basic Activity Booking App" built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication with JWT
- List activities (public endpoint)
- Book activities (authorized users only)
- Get user's bookings

## Tech Stack

- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT Token-based auth
- Validation: express-validator
- Password hashing: bcrypt

## Project Structure

```
├── config/             # Configuration files
├── controllers/        # Controllers for handling requests
├── middlewares/        # Custom middlewares
├── models/             # MongoDB models
├── routes/             # API routes
└── index.js            # Main entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a config.env file in the config folder with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/activity-booking-app
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### User Routes

- **POST /api/users/register** - Register a new user
  - Body: `{ name, email, phone, password }`
  
- **POST /api/users/login** - Login user
  - Body: `{ email, password }`
  
- **GET /api/users/profile** - Get user profile (Protected)

### Activity Routes

- **GET /api/activities** - Get all activities
  
- **GET /api/activities/:id** - Get activity by ID
  
- **POST /api/activities** - Create a new activity (Protected)
  - Body: `{ title, description, location, dateTime }`

### Booking Routes

- **POST /api/bookings** - Book an activity (Protected)
  - Body: `{ activityId }`
  
- **GET /api/bookings** - Get user's bookings (Protected)

## Authentication

Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
``` 