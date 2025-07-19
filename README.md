# Archana Groups

A modern web application for Archana Groups - a multi-business conglomerate with operations in transport and biocycle/biomass sectors.

## Overview

This is a Next.js 15+ application built with TypeScript, featuring:
- Multi-business showcase (Transport & BioCycle)
- Admin panel with authentication
- Partner portal
- Modern UI with Tailwind CSS v4
- Database integration with Drizzle ORM
- tRPC for type-safe APIs

## Tech Stack

- **Framework**: Next.js 15.4+ with App Router
- **Language**: TypeScript 5.8+
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI primitives
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **API Layer**: tRPC v11
- **State Management**: React Query (Tanstack Query)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Environment variables configured (see `.env.example`)

## Installation

```bash
# Install dependencies
npm install
# or
bun install
```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=your_postgres_connection_string

# Authentication
BETTER_AUTH_SECRET=your_auth_secret

# Other configuration as needed
```

## Development

```bash
# Start development server
npm run dev
# or with Turbo
npm run dev:turbo

# Start with debugging
npm run dev:inspect
```

The application will be available at `http://localhost:3000`

## Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Generate sitemap (runs automatically after build)
npm run sitemap
```

## Database Management

```bash
# Push schema changes to database
npm run db:push

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio for database management
npm run db:studio
```

## Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format

# Fix formatting
npm run format:fix
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── biocycle/          # BioCycle business section
│   ├── transport/         # Transport business section
│   ├── partner/           # Partner portal
│   └── api/               # API routes
├── features/              # Feature-based modules
├── shared/                # Shared components and utilities
├── config/                # Configuration files
├── lib/                   # Library utilities
└── styles/                # Global styles

scripts/                   # Utility scripts
├── setup-admin.ts        # Admin setup script
```

## Features

### Business Sections
- **Transport Services**: Comprehensive transport and logistics solutions
- **BioCycle**: Biomass and sustainable energy solutions

### Admin Panel
- Secure authentication system
- Dashboard for business management
- User and partner management

### Partner Portal
- Dedicated portal for business partners
- Secure access with authentication

### SEO & Performance
- Automatic sitemap generation
- SEO optimization
- Performance monitoring with bundle analysis

## Scripts Reference

- `dev` - Start development server with Turbo
- `build` - Build for production
- `start` - Start production server
- `lint` - Check code quality
- `format` - Check code formatting
- `db:studio` - Open database management UI
- `setup:admin` - Initialize admin user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software owned by Archana Groups.

## Support

For support and inquiries, please contact the development team.