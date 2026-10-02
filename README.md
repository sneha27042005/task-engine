# Task Engine

An event-driven distributed task management system built using TypeScript, Docker, GraphQL, gRPC, and Apache Kafka.

2. Technologies
## Technologies

- TypeScript
- Node.js
- Apollo GraphQL
- gRPC / Protocol Buffers
- Apache Kafka
- Docker
- Docker Compose

3. Architecture
Use the technically correct version:
## Architecture

GraphQL
   ↓
Task Service
   ├──→ gRPC Notification Service
   │
   └──→ Kafka Producer
          ↓
      Kafka Topic
          ↓
      Kafka Consumer

4. Features
## Features

- Create tasks using GraphQL
- Retrieve all tasks
- Retrieve a task by ID
- Update task status
- Send task notifications through gRPC
- Publish task events to Kafka
- Consume Kafka events
- Run the complete system using Docker Compose

5. Project structure
Keep the structure you already have.
6. How to run
Include:
npm install
docker compose up -d --build
docker compose ps

7. GraphQL operations
Include the four operations we tested:
- Create Task
- Get Tasks
- Get Task
- Update Task Status
8. Kafka
Mention:
Topic: task-events

9. gRPC
Mention:
Port: 50051

10. Docker services
| Service | Port | Purpose |
|---|---:|---|
| App | 3000 | GraphQL + gRPC |
| Kafka | 9092 | Event streaming |

11. Status
## Status

The complete event-driven flow has been tested successfully.