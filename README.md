# Test Task Project

A modern web application built with Next.js 15, React, Material-UI, and React Query for viewing and saving user information with weather data.

## 📋 Task Overview

The application allows users to:
- View random user information fetched from API
- Display current weather for each user's location
- Save users to local storage (IndexedDB)
- View saved users in a separate page
- Load more users with pagination

### Features Implemented

**Main Route:**
- User cards displaying: name, gender, profile image, location, email
- Weather information: icon, current temperature, min/max for the day
- Save button to store user in IndexedDB
- Weather button to show detailed weather in modal
- Load more users functionality

**Saved Users Route:**
- List of saved users with similar card design
- Remove button instead of save button
- Weather functionality available

**Bonus Points Implemented:**
-  **Update current temperature periodically (every 5 minutes)** - implemented with React Query automatic refetch
-  **Use Next.js API for handling all 3rd party requests** - custom API routes for users and weather
-  **Store saved user in IndexedDB instead of localStorage** - full IndexedDB implementation
-  **Responsive design** - looks good on mobile and desktop devices

## 🛠 Tech Stack

- **Next.js 15** - React framework for production
- **React** - JavaScript library for building user interfaces
- **Material-UI (MUI)** - React component library for faster development
- **React Query** - Data fetching and state management library

## 🚀 Getting Started

### Development Mode

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## 📝 Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode

## 📦 Project Structure

```
├── src/
│   ├── app/          # Next.js App Router pages and API routes
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API and data services
│   ├── shared/       # Shared utilities and types
│   ├── providers/    # Context providers
│   ├── config/       # Configuration files
│   └── utils/        # Utility functions
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## 🔧 Development

This project uses Next.js 15 with the latest React features. Make sure you have Node.js installed on your machine.

## 📄 License

This project is created as a test task