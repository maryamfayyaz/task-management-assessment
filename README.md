# task-management-assessment

A scalable, maintainable, backend API for a task management service. Built with Node.js, Express, PostgreSQL, Redis, and Sequelize.

---

## System Architecture Diagram

```
                           │ HTTP
                    ┌──────▼────────┐
                    │   API Server  │
                    │ (Node + Express) │
                    └──────┬────────┘
              ┌────────────┴────────────┐
              │                         │
      ┌───────▼────────┐        ┌───────▼────────┐
      │  PostgreSQL DB │        │  Redis Pub/Sub │
      │ (Sequelize ORM)│        │   (Events/Logs)│
      └────────────────┘        └────────────────┘
```

---

## Project Description & Setup

This backend provides RESTful endpoints to manage tasks. It is built to support filtering, sorting, and message-based notifications via Redis.

### Features
- Create, update, delete, and filter tasks
- Redis Pub/Sub integration for events like task creation
- Swagger UI documentation
- Fully Dockerized

### 🔧 Setup Instructions

#### 1. Clone & install dependencies
```bash
git clone <repo-url>
cd task-management-assessment
```

#### 2. Create `.env` file
```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/taskdb
REDIS_URL=redis://localhost:6379
```

#### 3. Start PostgreSQL and Redis (or use Docker)
```bash
docker-compose build && docker-compose up
```

#### 4. Start the app (with out docker)
```bash
npm install && npm run dev
```

#### 5. Visit Swagger API Docs
```
http://localhost:3000/api-docs
```

---

## Tech Stack & Reasoning

| Layer            | Tech                       | Reasoning |
|------------------|----------------------------|-----------|
| Server           | Node.js + Express          | Lightweight, fast, flexible |
| ORM              | Sequelize                  | Strong Postgres support, easy to use |
| DB               | PostgreSQL                 | ACID-compliant, relational, scalable |
| Queue            | Redis Pub/Sub              | Lightweight, perfect for async events |
| Containerization | Docker + Docker Compose    | Local dev parity with prod |
| Docs             | Swagger + JSDoc            | Auto-generated, human-friendly |
| Validation       | Joi                 | Declarative and type-safe |

---

## Scalability Plan

| Aspect              | Strategy |
|---------------------|----------|
| **Database**        | Indexes on `dueDate`, `status`; partition by user if needed |
| **Traffic**         | Horizontal scaling with stateless Express + load balancer |
| **Queue Workers**   | Redis pub/sub can fan out to multiple consumer workers |
| **Caching**         | Redis for common GET queries (like filtered tasks) |
| **AI Tasks**        | Offloaded to async queues or external AI microservices |
| **Monitoring**      | Integrate with Prometheus/Grafana or hosted tool (e.g. Sentry) |

---

## Team Responsibilities (Small Team Example)

| Role         | Responsibility |
|--------------|----------------|
| Backend Lead | Architecture, core services, code reviews |
| Engineer 1   | API development, DB modeling |
| Engineer 2   | DevOps/Docker, Redis event consumers |
| QA           | API tests, validation checks, Swagger coverage |

---

## Assumptions & Limitations

- Assumes PostgreSQL and Redis are provisioned in cloud (or Docker)
- Auth is not implemented, but system is designed to be multi-tenant-ready
- AI-related endpoints (`/tasks/suggestions`) are stubbed — not production-ready
- Rate-limiting and RBAC can be layered in with middleware later
- Email delivery/logging events are simulated via console for now