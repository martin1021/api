# Express TypeScript Starter with Clean Architecture

A comprehensive Express.js starter project with TypeScript, Prisma, ESLint, and Prettier that follows clean architecture principles.

## Features

- **TypeScript** - Strongly typed language for writing more reliable code
- **Express.js** - Fast, unopinionated, minimalist web framework for Node.js
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **Clean Architecture** - Separation of concerns for better maintainability
- **Authentication** - JWT-based authentication
- **Validation** - Request validation using Zod
- **Error Handling** - Centralized error handling
- **ESLint & Prettier** - Code linting and formatting
- **Environment Variables** - Environment variables management

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares
├── models/         # Prisma schema and data models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd express-typescript-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Run database migrations:

```bash
npm run prisma:migrate
```

### Development

Start the development server:

```bash
npm run dev
```

The server will be running at http://localhost:3000.

### Build for Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Documentation

### Authentication

#### Register a new user

```
POST /api/auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

#### Login

```
POST /api/auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
  }
}
```

#### Get current user

```
GET /api/auth/me
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Users

#### Get all users (Admin only)

```
GET /api/users
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "users": [
      {
        "id": "user-id",
        "email": "user@example.com",
        "name": "John Doe",
        "role": "USER",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### Get user by ID

```
GET /api/users/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

#### Update user

```
PATCH /api/users/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Request body:

```json
{
  "name": "Updated Name"
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "Updated Name",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

#### Delete user (Admin only)

```
DELETE /api/users/:id
```

Headers:

```
Authorization: Bearer jwt-token
```

Response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error message"
}
```

Common HTTP status codes:

- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication error)
- `403` - Forbidden (authorization error)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

## License

This project is licensed under the MIT License.

test update