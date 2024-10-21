# Chat App
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Features
- Welcome page where users can enter their name and select background color for the chat screen
- Real-time messaging, with input field and submit button
- Option to take photo, access photo library and upload images
- Users can share location data
- Data stored online and offline

## Technologies Used
- React Native
- Expo
- Firebase (Firestore, Cloud Storage, Authentication)
- Gifted Chat
- Local storage
- React Navigation
- AsyncStorage

## Installation

**1. Clone the repository**
   ```
   git clone https://github.com/yourusername/chat-app.git
   ```

**2. Navigate to project directory**
   ```
   cd chat-app
   ```

**3. Install the required dependencies:**
   ```
   npm install
   ```

## Setup
**1. Ensure correct version of Node installed**
- Before installing Expo, ensure suitable version of Node installed. At this time, Expo only supports Node 16.. at max, so if have higher version, downgrade to "16.19.0" by running the following:
```
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
```

**2. Create a Firebase Project**
- Go to the Firebase Console (console.firebase.google.com).
- Create a new project.
- Add a Web app to the project and copy the Firebase configuration settings.

**3. Set up Firestore and Storage**
- In your Firebase console, navigate to Firestore Database and create a new database.
- Navigate to Storage and set up Firebase Storage.

## Usage
**1. Run the application**
   ```
   npx expo start
   ```

**2. Open the Expo app on your mobile device or emulator**
- Scan the QR code displayed in terminal or browser to run the app on your device.