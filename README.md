# E-Commerce Application

A modern e-commerce application built with Spring Boot backend and React frontend. The application features product listings, category filtering, price filtering, and a shopping cart system.

## Features

- Product listing with pagination
- Category-based filtering
- Price range filtering
- Shopping cart functionality
- Responsive design
- RESTful API
- Docker containerization

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

## Prerequisites

Make sure you have the following installed:
- Docker
- Docker Compose

## Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-app
```

2. Start the application using Docker Compose:
```bash
docker-compose up -d
```

This will start:
- MySQL database (port 3306)
- phpMyAdmin (port 8081)
- Backend Spring Boot application (port 8080)
- Frontend React application (port 80)

## Accessing the Application

- Frontend: http://localhost
- Backend API: http://localhost:8080
- phpMyAdmin: http://localhost:8081
  - Server: db
  - Username: admin
  - Password: admin123

## API Endpoints

### Products
- GET `/api/products` - Get all products (with pagination)
  - Query parameters:
    - page (default: 0)
    - size (default: 10)
    - categoryId (optional)
    - minPrice (optional)
    - maxPrice (optional)
- GET `/api/products/{id}` - Get a specific product
- POST `/api/products` - Create a new product
- PUT `/api/products/{id}` - Update a product
- DELETE `/api/products/{id}` - Delete a product

### Categories
- GET `/api/categories` - Get all categories
- GET `/api/categories/{id}` - Get a specific category
- POST `/api/categories` - Create a new category
- PUT `/api/categories/{id}` - Update a category
- DELETE `/api/categories/{id}` - Delete a category

## Development

### Rebuilding Individual Services

To rebuild and restart individual services:

```bash
# Rebuild and restart backend
docker-compose up --build -d backend

# Rebuild and restart frontend
docker-compose up --build -d frontend
```

### Viewing Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stopping the Application

```bash
docker-compose down
```

## Debugging

The backend application exposes a debug port (5005) that can be used with your IDE for remote debugging.

To connect a debugger:
1. Open your IDE's debug configuration
2. Create a remote JVM debug configuration
3. Set the host to localhost and port to 5005
4. Start the debug session

## Project Structure

```
ecommerce-app/
├── backend/                # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/              # React application
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Docker composition
└── README.md
``` 