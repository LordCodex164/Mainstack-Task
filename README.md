# Product Management API

## Overview

This project is a simple RESTful API designed to create and manage products in a store. Built using Node.js, Express, TypeScript, and MongoDB, it incorporates token-based authentication and follows best practices for clean code, error handling, and security.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Design](#database-design)
- [Error Handling](#error-handling)
- [Unit Testing](#unit-testing)
- [Docker](#docker)
- [Postman Documentation](#postman-documentation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete (CRUD) products
- Token-based authentication
- Input validation and sanitization
- Comprehensive error handling
- Fully documented API endpoints

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development
- **Express**: Web framework for building RESTful APIs
- **TypeScript**: Superset of JavaScript for type safety
- **MongoDB**: NoSQL database for data storage
- **Docker**: Containerization platform for easy deployment
- **Postman**: API documentation and testing tool
- **Jest**: Testing framework for unit tests
- **Supertest**: HTTP assertions for testing APIs

## API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | /api/products       | Retrieve all products           |
| GET    | /api/products/:id   | Retrieve a product by ID        |
| POST   | /api/products       | Create a new product            |
| PUT    | /api/products/:id   | Update a product by ID          |
| DELETE | /api/products/:id   | Delete a product by ID          |

## Authentication

This API uses token-based authentication. Users must authenticate to access protected routes. A valid token must be included in the `Authorization` header for requests to secure endpoints.

## Database Design

The MongoDB schema is designed for scalability and query efficiency. Each product document includes fields for name, description, price, and other relevant attributes.

## Error Handling

The API implements appropriate error codes and messages to handle various scenarios, including validation errors and resource not found.

## Unit Testing

Unit tests are written to ensure code quality and functionality. Tests cover all major components of the API.

## Docker

The API is containerized using Docker for easy deployment. To build and run the container, use the following commands:

```bash
docker compose --build
docker compose up -d
```

Getting Started
To run the project locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/LordCodex164/Mainstack-Task.git
cd Mainstack-Task
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3050
MONGO_URI=yourmongodburi
JWT_SECRET=yoursecretkey
```

Start the server:

```bash
npm run dev
```

The API will be available at `http://localhost:3050`.