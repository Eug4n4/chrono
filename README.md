# Chronos - Calendar Management Application

## Description

Chrono is a comprehensive calendar management application designed to help users organize events, reminders, and tasks efficiently. The application provides a modern, intuitive interface for managing personal calendars, sharing calendars with other users, and organizing events with different categories.

### Key Features

- **Personal Calendar Management**: Create, edit, and delete multiple calendars
- **Default Personal Calendar**: Automatically created for each new user
- **Holiday Calendar**: Holiday calendar based on user's country
- **Event Types**: Support for three event types - Arrangements, Reminders, and Tasks
- **Event Management**: Create events by setting their start, end dates and display color
- **Calendar Sharing**: Share your calendars with other users
- **User Authentication**: Registration and login with email verification
- **Profile Management**: Change user's avatar, login or country
- **Tags**: Organize events with custom tags for better categorization

## Tech Stack

- **Containerization**: Docker & Docker Compose
- **Development Server**: Nodemon (for Node.js hot reload)
- **Linter and code formatter**: ESLint, Prettier

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose ODM (v8.19.2)
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Security**: bcrypt (v6.0.0)
- **Email Service**: Nodemailer (v7.0.10)
- **Task Scheduling**: node-schedule (v2.1.1)
- **File Upload**: Multer (v2.0.2)
- **Validation**: express-validator (v7.3.0)
- **Others**: CORS, Cookie-parser

### Frontend

- **UI Library**: React (v19.1.1)
- **Build Tool**: Vite (v7.1.7)
- **State Management**: Redux Toolkit (v2.9.2)
- **Routing**: React Router DOM (v7.9.5)
- **HTTP Client**: Axios (v1.13.1)
- **Calendar Component**: FullCalendar (v6.1.19)
  - Day grid, Time grid, Multi-month views
- **UI Components**:
  - Lucide React (v0.553.0) - Icons
  - React Select (v5.10.2) - Dropdown selectors
  - React Toastify (v11.0.5) - Notifications
- **Utilities**:
  - js-cookie (v3.0.5) - Cookie management
  - jwt-decode (v4.0.0) - JWT decoding
  - countries-list (v3.2.0) - Country data

## Project Structure

```
    chrono/
    ├── backend/
    │   ├── src/
    │   │   ├── db/        # Database models and DTOs
    │   │   ├── modules/   # Feature modules (auth, calendar, event, etc.)
    │   │   ├── shared/    # Shared utilities and validators
    │   │   ├── app.js     # Express application
    │   │   └── router.js  # Global application router
    │   ├── storage/       # User avatars
    ├── frontend/
    │   ├── public/         # Global css and favico
    │   ├── src/
    │   │   ├── api/        # Axios instance and API service classes
    │   │   ├── components/ # Reusable JSX components
    │   │   ├── features/   # Redux state management
    │   │   ├── pages/      # JSX page components
    │   │   ├── utils/      # Utilities for working with cookies and react toastify
    │   │   ├── App.jsx    # Routing logic
    │   │   └── main.jsx    # React entry point
    └── docker-compose.yml
```

## How to Run This Project

### Requirements

- **Node.js** [Download](https://nodejs.org/en/download)
- **Docker** [Download](https://www.docker.com/get-started/)
- **MongoDB** [Atlas](https://www.mongodb.com/products/platform)

### Setup Instructions

#### Option 1: Using Docker Compose

1. **Clone the repository**

   ```bash
        git clone https://github.com/Eug4n4/chrono.git
        cd chrono
   ```

2. **Configure environment variables**

   - Copy .env.example to .env in both backend and frontend directories
   - Update the .env files with your configuration

    ```bash
        cd backend
        copy .env.example .env
        cd ../frontend
        copy .env.example .env
        cd ..
    ```

3. **Start the application with Docker Compose**

    ```bash
        docker-compose up --build
    ```

    Frontend will be available on port 5173. Backend will be available on port 5000

#### Option 2: Manual Installation

1. **Clone the repository**

   ```bash
        git clone https://github.com/Eug4n4/chrono.git
        cd chrono
   ```

2. **Setup backend**

    ```bash
        cd backend
        npm install
        copy .env.example .env # Configure your .env file with MongoDB connection and other settings
        npm run dev
    ```

    Environment variables:

    - DB_NAME - Name of your MongoDB database
    - MONGO_URI - MongoDB connection string
    - FRONTEND_HOST - Host of your frontend application
    - FRONTEND_PORT - Port of your frontend application
    - EMAIL - Email which will be used to send notifications/email verification mails
    - EMAIL_PASS - Email service password
    - JWT_SECRET - Secret key for JWT token

    The backend server will start on port 5000

3. **Setup frontend**

    ```bash
        cd frontend
        npm install
        copy .env.example .env # Configure your .env file with API URL (should be http://localhost:5000)
        npm run dev    
    ```

    The frontend application will start on port 5173

## Documentation links

- [Backend documentation](docs/DOCUMENTATION_BACKEND.md)
- [Frontend documentation](docs/DOCUMENTATION_FRONTEND.md)
