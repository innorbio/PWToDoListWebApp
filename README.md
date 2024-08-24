# Features

- Responsive Layout
- User Authentication
- Animation
- Add ToDo Items
- Delete ToDo Items
- Mark and completed and Uncompleted ToDo Items
- Syncs between Users in reacl time

# Tech Stack
- Firebase
- HTML5
- CSS 3
- TypeScript
- React

# Install Instructions
## Step 00 - Initial Setup

1. **Clone the repo**
- Clone this repository onto your computer in your desired locatiion.
- Open this project in visual studio code or any other code editor you wish to use however if your code editor does not have a built in terminal please run a terminal windows with admin permissions and direct it to this projects location on your computer.

2. **Install Dependencies:**
   - Make sure you have all the necessary dependencies installed by running:
     ```bash
     npm install
     ```
## Step 01 - Setup Firebase

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the instructions to create a new Firebase project.

2. **Add Firebase to Your Web App:**
   - In your Firebase project console, go to "Project Settings."
   - Scroll down to "Your Apps" and select the web icon (`</>`).
   - Register your app by providing a name and clicking "Register App."
   - Firebase will give you configuration code. Copy this configuration, as you'll need it in Step 2.

3. **Enable Firebase Authentication:**
   - In the Firebase console, go to "Authentication" from the left-hand menu.
   - Click "Get Started."
   - Go to the "Sign-In Method" tab and enable the simpel email and password only option.

4. **Setup Firebase Realtime Database:**
   - In the Firebase console, go to "Realtime Database" from the left-hand menu.
   - Click "Create Database" and choose a location.
   - Set the database to "Start in production mode" (you can modify the rules later for testing).

5. **Configure Database Rules (For Development):**
   - In the "Realtime Database" tab, go to the "Rules" section.
   - Set the rules to allow read and write access for authenticated users:
     ```json
     {
        "rules": {
          "todos": {
            ".read": "auth != null",
            ".write": "auth != null"
          }
        }
      }
     ```
## Step 02 - Configure database connetion file
1. **Modify the Firebase Config File:**
   - In the project files you downloaded locate a file called `db.ts`
   - Paste the configuration you copied from Firebase during the web app setup (Step 1). It should look something like this:
     ```ts
     // firebaseConfig.ts
     import { initializeApp } from "firebase/app";
     import { getAuth } from "firebase/auth";
     import { getDatabase } from "firebase/database";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getDatabase(app);
     ```

## Step 03 - Run the App

2. **Run the App:**
   - To start the development server, run:
     ```bash
     npm run dev
     ```

3. **Verify App is Running:**
   - Once the app is running, open your browser and go to `http://localhost:5173`.
   - Sign in or sign up using the authentication method you enabled in Firebase (e.g., Email/Password).
   - Create, update, and delete To-Do items to verify real-time synchronization between users.

