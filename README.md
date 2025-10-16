# Silice Backend

API REST para gestión de recibos con NestJS, MongoDB y RabbitMQ.

## Stack

- NestJS
- MongoDB
- RabbitMQ
- JWT Authentication
- Swagger
- Docker

## Dev

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose up --build`

La API estará disponible en `http://localhost:3000`

## Documentación

Swagger disponible en `http://localhost:3000/api/docs`

## Prod

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose -f docker-compose.prod.yml up --build`