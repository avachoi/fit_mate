# Fit Mate.AI

## Overview
Fit Mate.AI is a web application designed to help users achieve their fitness goals by generating custom workout plans based on individual health info, preferences, fitness levels, and goals. The app leverages the power of ChatGPT to create personalized workout routines, ensuring that every user gets a plan tailored to their needs.

## Features
User Signup & Profile Management: Users can sign up and create a profile with details like fitness level, preferences, goals, weight, height, and sex.
Personalized Workout Plans: The app generates custom workout plans using the ChatGPT API, tailored to the user’s input.
Workout Tracking: Users can track their progress by marking exercises as done.
Profile Editing: Users can update their profile information to adjust their workout plans according to changes in their fitness journey.


## Technologies Used
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

API: ChatGPT API for generating workout plans

Authentication: JWT for secure user authentication

Deployment: Render

## Installation
### Clone the repository:

```
git clone https://github.com/avachoi/fit_mate.git
cd fit_mate
```

### Install dependencies for both frontend and backend:

```
npm install
```

### Set up environment variables:

- Create a .env file in the backend directory.
- Add the following environment variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Build 
```
npm run build
```
### Run the application:

```
npm start
```
### Access the application:

- Navigate to http://localhost:5173 in your web browser.
  
## Usage
Sign Up: Create an account by providing your name, email, and password.

Profile Setup: Answer questions about your fitness level, preferences, and goals to create your profile.

Generate Workout Plan: Click "Generate Plans" to receive a personalized workout plan.

Track Progress: Use the app to keep track of your workouts and progress.

## API Routes
### User Routes:
- POST /api/users/signup: Sign up a new user.
- PUT /api/users/:id: Update user profile.
### Workout Routes:
- GET /api/workouts/:id: Get user's workout plans.
### ChatGPT Routes:
- POST /api/chat/generate: Generate a personalized workout plan using ChatGPT.

Image: <a href='https://pngtree.com/freepng/fitness-coach-original-hand-drawn-cartoon_5759419.html'>png image from pngtree.com/</a>

## Contact
For any questions or feedback, please feel free to contact me:

Email: avachoi12@gmail.com
LinkedIn: [Ava Jeongyeon Choi](https://www.linkedin.com/in/ava-jeongyeonchoi)
