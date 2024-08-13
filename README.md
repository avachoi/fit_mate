### Fit Mate.AI

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
Clone the repository:

```
git clone https://github.com/avachoi/fit_mate.git
cd fit_mate
Install dependencies for both frontend and backend:

```
npm install
```
Install dependencies for both frontend and backend:

bash
Copy code
npm install
cd backend
npm install
Set up environment variables:

Create a .env file in the backend directory.

Set up environment variables:

Create a .env file in the backend directory.
Add the following environment variables:
makefile
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
Run the application:

Start the backend server:
bash
Copy code
cd backend
npm run dev
Start the frontend server:
bash
Copy code
npm run dev
Access the application:

Navigate to http://localhost:5173 in your web browser.
Usage
Sign Up: Create an account by providing your name, email, and password.
Profile Setup: Answer questions about your fitness level, preferences, and goals to create your profile.
Generate Workout Plan: Click "Generate Plans" to receive a personalized workout plan.
Track Progress: Use the app to keep track of your workouts and progress.
API Routes
User Routes:
POST /api/users/signup: Sign up a new user.
PUT /api/users/:id: Update user profile.
Workout Routes:
GET /api/workouts: Get user's workout plans.
ChatGPT Routes:
POST /api/chat/generate-plan: Generate a personalized workout plan using ChatGPT.
Contributing
If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request.

License
This project is licensed under the MIT License.

Contact
For any questions or feedback, please feel free to contact me:

Email: avachoi12@gmail.com
LinkedIn: Ava Jeongyeon Choi
