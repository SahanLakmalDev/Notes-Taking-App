# Notes App

This is a simple note-taking application built with a React frontend and an Express backend. The application allows users to add, update, and delete notes, and it stores the notes in a PostgreSQL database using Prisma.

## Table of Contents
- [Frontend](#frontend)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Functionality](#functionality)
- [Backend](#backend)
  - [Technologies Used](#technologies-used-1)
  - [Installation](#installation-1)
  - [Functionality](#functionality-1)
- [Database](#database)
  - [Technologies Used](#technologies-used-2)
  - [Setup](#setup)
  - [Database Schema](#database-schema)
- [License](#license)
- [Version](#version)

## Frontend

### Technologies Used
- React
- TypeScript

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/SahanLakmalDev/Notes-Taking-App.git
    cd notes-app/notes-app-ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend:

    ```bash
    npm start
    ```

The React app will be accessible at `http://localhost:3000`.

### Functionality
- Fetches notes from the backend upon component mount.
- Adds a new note to the database.
- Updates an existing note in the database.
- Deletes a note from the database.

## Backend

### Technologies Used
- Express
- Prisma
- PostgreSQL

### Installation
1. Navigate to the `notes-app/notes-app-server` directory:

    ```bash
    cd ../notes-app-server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the backend:

    ```bash
    npm start
    ```

The Express server will run at `http://localhost:5001`.

### Functionality
- Provides API endpoints for fetching, adding, updating, and deleting notes.
- Connects to a PostgreSQL database using Prisma.

## Database

### Technologies Used
- PostgreSQL
- Prisma
- ElephantSQL

### Setup
1. Create a `.env` file in the `notes-app/notes-app-server` directory:

    ```bash
    touch .env
    ```

2. Open the `.env` file and add the following line to specify the database connection URL:

    ```env
    DATABASE_URL="your_database_connection_url"
    ```

   Make sure not to commit this file to your Git repository to keep your credentials secure.

### Database Schema
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Note {
  id      Int     @id @default(autoincrement())
  title   String
  content String
}
```
## License
This is Licensed under [MIT](License.txt)

## Version
1.0.0