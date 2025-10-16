# Silice Backend

API REST para gestión de recibos con NestJS, MongoDB y RabbitMQ.

## Requisitos

- Node.js v22
- Docker y Docker Compose

## Stack

- NestJS
- MongoDB
- RabbitMQ
- JWT Authentication
- Swagger
- Docker

## Variables de Entorno

Crear un archivo `.env` basado en `.env.template` con las siguientes variables:

```
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/recibos_db
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRES_IN=1d
```

## Dev

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose up --build`

La API estará disponible en `http://localhost:3000`

## Documentación

Swagger disponible en `http://localhost:3000/api/docs`

RabbitMQ Management disponible en `http://localhost:15672` (guest/guest)

## Prod

1. Clonar el repositorio
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose -f docker-compose.prod.yml up --build`