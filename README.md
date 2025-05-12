# ESIMaint - Maintenance Management System API

![ESIMaint Logo](https://via.placeholder.com/200x80?text=ESIMaint)

## 📖 Overview

ESIMaint is a comprehensive maintenance management system designed to streamline maintenance operations, asset management, and work order processing. This backend API provides robust functionality for managing maintenance tasks, assets, technician assignments, reporting, and more.

## 🚀 Features

- **User Management**: Role-based access control with different permission levels
- **Asset Management**: Track and manage all maintenance assets
- **Maintenance Scheduling**: Preventive and corrective maintenance planning
- **Work Order Processing**: Create, assign, and track maintenance tasks
- **Reporting**: Comprehensive reporting and analytics
- **Notifications**: Real-time alerts for maintenance activities
- **Mobile-Ready API**: Designed to support both web and mobile clients

## 🔧 Tech Stack

- **Framework**: NestJS
- **Database**: SQLite with Prisma ORM
- **Authentication**: OAuth2 (Google) + JWT-based authentication
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator and class-transformer
- **Testing**: Jest

## 📋 Prerequisites

- Node.js (v14.x or later)
- pnpm package manager
- Git

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url> ./backend
cd backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following configuration:

```env
# Database Configuration
DATABASE_URL="file:./dev.db?connection_limit=1&socket_timeout=5000"

# OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:4000/auth/google/callback"

# JWT Configuration
JWT_SECRET="your-jwt-secret-key"

# Email Configuration
GMAIL_REFRESH_TOKEN="your-gmail-refresh-token"
GMAIL_CLIENT_ID="your-gmail-client-id"
GMAIL_CLIENT_SECRET="your-gmail-client-secret"
GMAIL_REDIRECT_URL="http://localhost/"
```

> **Note**: The complete environment variables will be provided in the classroom.

### 4. Database Setup

Initialize the database with Prisma:

```bash
pnpm prisma db push
```

This command creates the database schema based on your Prisma models.

## 🚀 Running the Application

### Development Mode

```bash
# Start the development server with hot-reload
pnpm run start:dev
```

### Production Mode

```bash
# Build the application
pnpm run build

# Start the production server
pnpm run start:prod
```

## 📊 Database Seeding

The application includes a seeding module to populate your database with initial data.

To seed the database:

1. Start the application
2. Navigate to the Swagger documentation at `http://localhost:4000/docs`
3. Locate and execute the seeder endpoints under the `/seeder` section
4. Use the "Confirm" key as requested in the endpoints

> **Important**: Seeding should typically be done on a fresh database to avoid conflicts.

## 📝 API Documentation

The API is fully documented using Swagger/OpenAPI.

- **Access Swagger UI**: `http://localhost:4000/docs`
- **API Endpoint Base**: `http://localhost:4000/`

The Swagger UI provides:
- Complete endpoint documentation
- Request/response schemas
- Testing interface for all endpoints
- Authentication support

## 📁 Project Structure

```
src/
├── common/              # Common utilities, filters, and interceptors
├── modules/             # Feature modules
│   ├── assets/          # Asset management
│   ├── auth/            # Authentication and authorization
│   ├── categories/      # Category management
│   ├── intervention-requests/ # Intervention request handling
│   ├── notifications/   # Notification system
│   ├── prisma/          # Prisma service and configuration
│   ├── professions/     # Profession management
│   ├── reports/         # Reporting functionality
│   ├── seeder/          # Database seeding
│   ├── stats/           # Statistics and analytics
│   ├── tasks/           # Task management
│   └── users/           # User management
│       └── technicians/ # Technician management
├── app.module.ts        # Root application module
└── main.ts              # Application entry point
```

## 🔐 Authentication

The API uses Google OAuth2 for authentication, followed by JWT tokens for subsequent requests:

1. Login with Google via `/auth/google` endpoint
2. After successful authentication, you'll receive a JWT token
3. Include the token in the `Authorization` header as `Bearer <token>` for protected endpoints



## 📊 Seeding Database Step by Step

1. Start the application:
   ```bash
   npx nest start
   ```

2. Open the Swagger UI at `http://localhost:4000/docs`

3. Navigate to the `/seeder` endpoints section

4. Execute the `/seeder/confirm` endpoint with proper "confirm" parameter to seed the database with:
   - Users with different roles (Admin, Technician, Staff)
   - Asset categories and hierarchies
   - Equipment and locations
   - Professions for technicians
   - Maintenance reports
   - Work orders and assignments
   - Preventive maintenance schedules

5. You can verify the seeded data through the relevant endpoints in the Swagger UI

## 🔄 Main Workflows

### User Management Workflow
- Login with Google OAuth2
- Request role promotions via `/users/askpromotion`
- Admins approve/reject promotions via `/users/:id/validate`

### Maintenance Workflow
- Users create maintenance reports
- Admins create intervention requests and assign technicians
- Technicians update and complete assigned tasks
- System generates notifications for status changes

### Preventive Maintenance
- Schedule recurring maintenance tasks
- Monitor maintenance due dates
- Generate reports when maintenance is needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- Developer Team - [ESIMaint Team]()

## 📞 Support

For support or questions, please contact the development team.
