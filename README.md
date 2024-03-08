# About

A simple Cricbuzz task api server built using NodeJS-Express, MongoDB, MinIO and Swagger.

## Prerequisites

- Docker
- Docker Compose

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/roguedev5/cricbuzz-task-api
   ```

2 **RUN:**

```bash
docker-compose up
```

- This will start the app at http://localhost:7000.

- Access MongoDB Express at http://localhost:8081 to view and manage MongoDB collections.

- Access Swagger API documentation at http://localhost:8080/cricbuzz-api for the list of available APIs.

## Roadmap

- [ ] Add Express Rate Limiter
- [ ] Add Request validator
