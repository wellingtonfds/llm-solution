
# LLM Solution - Water Meter Reader

## Overview

**LLM Solution** is a project that uses a combination of AI technologies and modern web development frameworks to read and process water meter data from images. The application integrates with **Google Gemini** to utilize generative AI for image recognition, processes the data with **NestJS**, and stores it in a **PostgreSQL** database. The entire solution is containerized using **Docker** for seamless deployment and scalability.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: An open-source relational database to store and manage the water meter readings.
- **Google Gemini AI**: AI-powered image recognition to extract water meter numbers from images.
- **Docker**: Used to containerize the application, ensuring consistent environments for development and production.
- **Swagger**: Provides API documentation and testing interface, accessible at `http://localhost:3000/api`.

## Directory Structure

The project is divided into several modules, each handling different responsibilities of the application:

```
├── customer
│   ├── dto
│   ├── exceptions
│   ├── repository
│   ├── serialize
│   └── types
├── generative-ai
│   └── (logic for Google Gemini AI integration)
├── measure
│   ├── dto
│   ├── exceptions
│   ├── repository
│   ├── serialize
│   ├── types
│   └── validate
├── shared
│   └── dto
├── storage
│   └── (handles file management and storage)
└── docker-compose.yml
```

### Module Descriptions

- **customer**: Manages customer data, including types, data transfer objects (DTOs), exceptions, and serialization logic.
- **generative-ai**: Handles the integration with Google Gemini AI to read water meter images.
- **measure**: Manages the processing of water meter readings, including validation, repository logic, and serialization.
- **shared**: Contains shared DTOs used across the application.
- **storage**: Responsible for handling file uploads and managing storage.

## Prerequisites

- **Node.js** (v16+)
- **PostgreSQL** (v12+)
- **Docker** (v20+)

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/llm-solution.git
   cd llm-solution
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and configure your database connection and API keys.

   ```env
   DATABASE_URL=postgres://myuser:mypassword@db:5432/mydatabase
   GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. **Run Docker**:

   Ensure Docker is running, then use `docker-compose` to start the services.

   ```bash
   docker-compose up --build
   ```

5. **Apply Prisma Migrations**:

   After starting the container, apply the migrations to the PostgreSQL database:

   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

6. **Access the application**:

   The application will be running at `http://localhost:3000`.

## API Endpoints

The API exposes several endpoints for managing customers and processing water meter readings.

- **POST /upload**: Upload a water meter image for reading..
- **PATH /confirm**: Confirme de measure value.
- **GET /:id/list**: Retrieves a list of measures
- **GET /file/:id**: Retrieve a temporary file

## Swagger Documentation

Swagger provides an interactive API documentation at:

- **URL**: `http://localhost:3000/api`

You can use Swagger to explore the available API endpoints and test them directly from your browser.

## Testing

To run tests, use the following command:

```bash
npm run test
```

## Contributing

If you want to contribute to this project, feel free to open a pull request. We welcome any improvements and bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
