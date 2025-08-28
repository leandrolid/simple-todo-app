# Todo List API

This is a simple Todo List API built with NestJS and TypeORM, using PostgreSQL as the database. The project is containerized using Docker Compose for easy setup.

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Project

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd todo-list
   ```

2. **Start the services:**
   ```sh
   docker compose up -d
   ```
   This will build and start the API and the PostgreSQL database.

3. **Access the API:**
   - The API will be available at `http://localhost:3000` (default).
   - Swagger documentation: `http://localhost:3000/api`

4. **Stopping the services:**
   ```sh
   docker compose down
   ```

## Next Steps

- **Add Tests:**
  - Unit and integration tests can be added using Jest.
  - Run tests with:
    ```sh
    npm run test
    ```

- **Adjustments:**
  - Update environment variables in `compose.yaml` as needed.
  - Add new features or endpoints in the `src/` directory.
  - Adjust rate limiting or security settings in `src/infra/middlewares/`.

## Useful Commands

- Format code:
  ```sh
  npm run format
  ```
- Lint code:
  ```sh
  npm run lint
  ```
