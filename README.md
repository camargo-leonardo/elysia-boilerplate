# Elysiajs Boilerplate

A modern, type-safe backend boilerplate built with **Bun**, **ElysiaJS**, **Better Auth**, and **Drizzle ORM**. This template provides everything you need to build scalable REST APIs quickly.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- [Docker](https://www.docker.com/) & Docker Compose (recommended)
- [PostgreSQL](https://www.postgresql.org/) 16+ (if not using Docker)

### Installation

```bash
# Clone the repository
git clone https://github.com/camargo-leonardo/elysia-boilerplate.git
cd elysia-boilerplate

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
```

### Environment Configuration

Edit `.env` file with your settings:

```env
# Server
PORT=3003
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp

# Better Auth
BETTER_AUTH_SECRET=your-super-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:3003
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3003
```

> ⚠️ **Important**: Change `BETTER_AUTH_SECRET` in production to a secure random value

### Run with Docker (Recommended)

```bash
# Start all services (PostgreSQL + API)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

Your API will be available at `http://localhost:3003`

### Run Locally (Without Docker)

```bash
# Start PostgreSQL (if not running)
docker run --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 -d postgres:16-alpine

# Run database migrations
bun run migrate:generate
bun run migrate:apply

# Generate and apply Better Auth migrations
bun run auth:generate
bun run auth:migrate

# Start development server
bun run dev
```

## 📚 Documentation

### Interactive API Documentation (OpenAPI)

Access the interactive Swagger UI at:

**🔗 [http://localhost:3003/openapi](http://localhost:3003/openapi)**

Features:

- 📖 View all available endpoints
- 🧪 Test API requests directly in the browser
- 📝 See request/response schemas
- 🔐 Understand authentication requirements

---

## 🗃️ Database Management

### Drizzle ORM Migrations

```bash
# Generate migration after schema changes
bun run migrate:generate

# Apply pending migrations
bun run migrate:apply

# Open Drizzle Studio (Visual database browser)
bun run db:studio
```

### Better Auth Migrations

```bash
# Generate Better Auth SQL migrations
bun run auth:generate

# Apply Better Auth migrations
bun run auth:migrate
```

### Drizzle Studio

Explore your database with the interactive Drizzle Studio:

```bash
bun run db:studio
# Opens at https://local.drizzle.studio
```

---

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test src/tests/services/user.test.ts
```

---

## 📝 Available Scripts

| Command                    | Description                              |
| -------------------------- | ---------------------------------------- |
| `bun run dev`              | Start development server with hot reload |
| `bun run start`            | Start production server                  |
| `bun run build`            | Build the application                    |
| `bun test`                 | Run all tests                            |
| `bun run migrate:generate` | Generate Drizzle migrations              |
| `bun run migrate:apply`    | Apply Drizzle migrations                 |
| `bun run auth:generate`    | Generate Better Auth migrations          |
| `bun run auth:migrate`     | Apply Better Auth migrations             |
| `bun run db:studio`        | Open Drizzle Studio                      |
| `bun run docker:up`        | Start Docker services                    |
| `bun run docker:down`      | Stop Docker services                     |
| `bun run docker:logs`      | View Docker logs                         |

---

## 🤝 Contributing

Contributions are welcome! We appreciate your help in making this boilerplate better.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ using [Bun](https://bun.sh/) + [ElysiaJS](https://elysiajs.com/) + [Better Auth](https://www.better-auth.com/) + [Drizzle ORM](https://orm.drizzle.team/)**
