# Server - Chrome Extension for Blocking Sources by URL

This is the backend server for the Chrome extension for blocking sources by URL, built with NestJS. The server handles authentication, data processing, and communication with the client. It includes a PostgreSQL database setup.

## Project Structure

- **NestJS**: Backend framework for building server-side applications.
- **Prisma**: ORM for database management and schema migrations.
- **PostgreSQL**: Database for storing information.
- **Zod**: Schema validation for TypeScript.

## Requirements

- **Node.js**: Ensure you have Node.js installed.
- **Docker**: For running the PostgreSQL database.

## Database Setup with Docker

To install and run the PostgreSQL database with Docker:

1. **Pull the PostgreSQL image**:
   ```bash
   docker pull postgres
2. **Run the PostgreSQL container:**
  ```bash
  docker run -d --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 8080:5432 postgres 
  ```
or
  ```bash
  docker compose up
  ```

This command will set up a PostgreSQL instance on localhost:8080.
## Setup Instructions

1. **Scripts**

| Command              | Description                                         |
|----------------------|-----------------------------------------------------|
| `npm run build`      | Builds the application                              |
| `npm run format`     | Formats code using Prettier                         |
| `npm run start`      | Starts the server in production mode                |
| `npm run start:dev`  | Starts the server in development mode with watch    |
| `npm run start:debug`| Starts the server in debug mode                     |
| `npm run start:prod` | Starts the production server from compiled files    |
| `npm run lint`       | Lints the codebase using ESLint                     |
| `npm run db:generate`| Generates Prisma client based on schema             |
| `npm run db:push`    | Pushes schema changes to the database               |

2. **Environment Variables**

- Set up a .env file at the root of your project to configure the database connection and other environment-specific settings.

3. **Database Setup with Prisma**

- Ensure the PostgreSQL Docker container is running:
  ``` bash
  docker start postgres
- Generate the Prisma client:
  ```bash
  npm run db:generate
- Apply the Prisma schema changes to the database:
  ```bash
  npm run db:push

4. **Run the Development Server**

  ```bash
  npm run start:dev
  ```
## Linting and Formatting
- **Linting:** Run npm run lint to check code quality.
- **Formatting:** Use npm run format to format code using Prettier.
## Libraries Used
- **@nestjs/common, @nestjs/core, etc.:** Core NestJS modules.
- **Prisma:** For interacting with the PostgreSQL database.
- **Zod:** Schema validation for request data.
- **Prettier:** For code formatting.

## Additional Notes
- **Database Access:** The PostgreSQL database is accessible at localhost:8080 when using Docker.
- **Debugging:** Use npm run start:debug to run the server in debug mode.
