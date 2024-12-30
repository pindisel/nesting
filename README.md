# NestJS API Template

##### Latest update: 2024-12-30

##### Latest updater: [Anathapindika Muliawan](https://github.com/pindisel)

- [NestJS API Template](#nestjs-api-template) - [Latest update: 2024-12-30](#latest-update-2024-12-30)
  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Folder Structure](#folder-structure)
  - [Endpoints (API) - TBD](#endpoints-api)

## Introduction

This is a template for a NestJS API project. This template is intended to be used as a starting point for a new project. Features include:

- Generator for new modules
- Database connection (Sequelize)
- Simple CRUD operations
- Authentication (JWT)
- Authorization (Role-based)
- Http Exception handling
- Rate limiting
- Logging
- Unit tests
- E2E tests

## Requirements

- NPM, v8+
- Node.js, v16+
- PostgreSQL, v13+

## Installation

1. Clone the repository
2. Install dependencies

```bash
$ npm install
```

3. Create a `.env` file in the root directory
4. Migrate the database

```bash
$ npm run migrate
```

5. Generate a new module

```bash
$ npm run generate <module-name>
```

6. Start the application

```bash
# development
$ npm run dev

# production
$ npm run start
```

7. Run tests

```bash
# development
$ npm run test:watch

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Folder Structure

```bash
├── scripts/                # Custom scripts
│   └── generate.ts         # Script for code generation
├── src/                    # Application source code
│   ├── common/             # Shared utilities and components
│   │   ├── decorators/     # Custom decorators
│   │   ├── dtos/           # Data Transfer Objects
│   │   └── utils/          # Utility functions
│   ├── config/             # Configuration files
│   ├── database/           # Database configuration and migrations
│   │   ├── migrations/     # Migration scripts
│   │   ├── database.module.ts
│   │   └── query-builders/ # Custom query builders
│   ├── models/             # Data models and entities
│   ├── modules/            # Feature modules
│   │   ├── auth/           # Authentication module
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   ├── services/
│   │   │   └── strategies/
│   │   ├── module-role/    # Role-based module
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   └── services/
│   │   ├── user/           # User module
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   ├── repositories/
│   │   │   └── services/
│   │   └── index.ts
│   ├── shared/             # Shared components
│   │   ├── filters/        # Custom filters
│   │   ├── guards/         # Custom guards
│   │   ├── interceptors/   # Custom interceptors
│   │   ├── interfaces/     # Shared interfaces
│   │   ├── middleware/     # Middleware functions
│   │   ├── pipes/          # Validation pipes
│   │   ├── tests/          # Test utilities
│   │   └── constants.ts    # Shared constants
│   ├── app.module.ts       # Main application module
│   └── main.ts             # Application entry point
├── test/                   # E2E tests
├── .eslint.js              # ESLint configuration
├── .gitignore              # Git ignore file
├── .prettierrc             # Prettier configuration
├── .sequelizerc            # Sequelize CLI configuration
├── .env                    # Environment variables
├── example.env             # Example environment variables
├── package.json            # npm dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## Endpoints (API)

Postman collection will be provided.
