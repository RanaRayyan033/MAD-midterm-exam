# Skybrews Coffee App

A full-stack mobile application for a coffee shop built with React Native and Node.js.

## Project Overview

This is a complete coffee shop application originally developed as a university project. It includes a live menu, shopping cart, and full checkout process.

## Features

### Core Functionality
- Complete mobile app for coffee ordering
- Live menu with item details
- Shopping cart that saves between sessions
- Full checkout process with order confirmation

### Technical Features
- React Native frontend with Expo
- Node.js and Express backend
- MongoDB database
- Global state management
- Automatic IP configuration

### User Experience
- View detailed item information
- "Surprise Me" feature for random item selection
- Modern and clean interface
- Real-time cart updates
- Form validation during checkout

## Technology Stack

### Frontend
- React Native
- Expo


### Backend
- Node.js
- Express
- MongoDB with Mongoose

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment file:
   - Create .env file with MongoDB connection string

4. Database setup:
   - Create database: coffee_shop_db
   - Create collection: menu_items
   - Add menu data

5. Start server:
   ```
   node server.js
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start application:
   ```
   npx expo start -c
   ```

4. Use Expo Go app to scan QR code

## API Endpoints

- GET /menu - Get all menu items
- GET /menu/random - Get random item
- GET /menu/:id - Get specific item

## Project Structure

```
skybrews-coffee-app/
├── backend/
│   ├── server.js
│   ├── models/
│   └── routes/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── store/
│   └── apiConfig.ts
└── README.md
```

