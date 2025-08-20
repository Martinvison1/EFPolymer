# EF Polymer Local-Only CRM

A comprehensive local-only CRM web application tailored for EF Polymer's agronomy-focused sales cycle. This application runs entirely on localhost with no external dependencies or data transmission.

## Features

### Core CRM Modules
- **Accounts & Contacts**: Manage organizations and people
- **Leads & Qualification**: Lead scoring and conversion workflow  
- **Opportunities & Pipeline**: Sales pipeline with EF Polymer agronomy fields
- **Trials & Agronomy**: Field trial management with measurements and analytics
- **Activities & Tasks**: Calendar and task management
- **Products & Pricing**: Catalog with regional pricing tiers
- **Quotes & Proposals**: Quote generation with PDF output
- **Support Tickets**: Customer service case management
- **Documents Vault**: Encrypted file storage and management
- **Reports & Dashboards**: Analytics and KPI tracking

### Security & Privacy
- **Localhost-only**: No external network connections by default
- **Encrypted Database**: SQLite with SQLCipher encryption
- **Encrypted Vault**: AES-256-GCM file encryption
- **Local Authentication**: Argon2id password hashing
- **Session Management**: HTTP-only secure cookies
- **Audit Trail**: Immutable activity logging

### Platform Support
- **Desktop App**: Electron packaging for macOS and Windows
- **Headless Mode**: Node.js service with browser interface
- **Local TLS**: Self-signed HTTPS certificates
- **Backup & Restore**: Encrypted automated backups

## Quick Start

### Prerequisites
- Node.js 18+ LTS
- npm 9+
- Git

### Installation

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd efpolymer-crm
   npm run install:all
   ```

2. **Setup database**:
   ```bash
   cd backend
   cp .env.example .env
   npx prisma migrate deploy
   npx prisma generate
   npm run seed
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access application**:
   - Open https://localhost:8443
   - Login with: `admin@local` / `ChangeMe!123`

### Build for Production

```bash
# Build both frontend and backend
npm run build

# Package as Electron app
npm run app:pack

# Run production server
npm run start
```

## Project Structure

```
efpolymer-crm/
├── backend/              # NestJS API server
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   ├── common/       # Shared utilities
│   │   └── config/       # Configuration
│   ├── prisma/           # Database schema and migrations
│   └── dist/             # Built backend code
├── frontend/             # React TypeScript SPA
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript definitions
│   └── dist/             # Built frontend code
├── shared/               # Shared types and utilities
├── docs/                 # Documentation
├── scripts/              # Build and deployment scripts
└── main.js               # Electron main process
```

## Database Schema

The application uses SQLite with the following main entities:

- **Account**: Organizations (farms, distributors, NGOs)
- **Contact**: People associated with accounts
- **Lead**: Pre-qualified prospects
- **Opportunity**: Sales opportunities with EF Polymer-specific fields
- **Trial**: Field trials with measurements and analytics
- **Activity**: Tasks, meetings, calls, and follow-ups
- **Product**: EF Polymer product catalog
- **Quote**: Sales quotations with line items
- **Ticket**: Customer support cases
- **Document**: Encrypted file metadata
- **User**: Application users with role-based access
- **AuditLog**: Immutable activity tracking

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Current user profile

### Core Resources
- `GET|POST /api/v1/accounts` - List/create accounts
- `GET|PATCH|DELETE /api/v1/accounts/:id` - Account CRUD
- `GET|POST /api/v1/opportunities` - List/create opportunities
- `POST /api/v1/opportunities/:id/move` - Move pipeline stage
- `GET|POST /api/v1/trials` - List/create trials
- `POST /api/v1/trials/:id/measurements` - Add measurements

All endpoints require authentication except `/auth/login`.

## Configuration

### Environment Variables

Create `.env` in the backend directory:

```bash
# Database
DATABASE_URL="file:./data/efpcrm.db"

# Security  
JWT_SECRET="your-jwt-secret"
SESSION_SECRET="your-session-secret"

# Server
PORT=8443
HOST=127.0.0.1

# Features
LAN_MODE=false
TELEMETRY_ENABLED=false
```

### Data Directory Structure

Default data location:
- **macOS**: `~/Library/Application Support/EFPolymerCRM`
- **Windows**: `%LOCALAPPDATA%\\EFPolymerCRM`

```
EFPolymerCRM/
├── db/                   # SQLite database file
├── vault/                # Encrypted document storage
├── backups/              # Encrypted backup snapshots
├── logs/                 # Application logs
├── certs/                # TLS certificates
└── config/               # Settings and configuration
```

## Security Features

### Encryption
- Database encrypted with SQLCipher (256-bit keys)
- Files encrypted with AES-256-GCM per file
- Keys stored in OS keychain (macOS/Windows)
- HTTPS with self-signed certificates

### Authentication
- Argon2id password hashing (192 MiB memory cost)
- HTTP-only, SameSite=strict cookies
- Automatic session timeout (20 minutes default)
- Role-based access control

### Privacy
- No external network connections
- Optional LAN mode with mutual TLS
- Local-only operation by design
- Telemetry disabled by default

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start with hot reload
npm run lint         # Run ESLint
npm run test         # Run unit tests
npx prisma studio    # Database GUI
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite dev server
npm run lint         # Run ESLint
npm run build        # Build for production
```

### Database Migrations
```bash
cd backend
npx prisma migrate dev --name description
npx prisma generate
```

## Testing

Run the test suite:
```bash
npm test                 # Run all tests
cd backend && npm test   # Backend tests only
cd frontend && npm test  # Frontend tests only
```

Test coverage targets:
- ≥80% overall coverage
- 100% coverage on critical security paths
- API endpoint tests for all CRUD operations

## Deployment

### Electron Desktop App
```bash
npm run app:pack        # Create installers
npm run app:start       # Start app and open browser
```

### Service Mode
```bash
npm run build           # Build application
npm run start           # Start as service
```

## Troubleshooting

### Common Issues

**Database locked error**:
```bash
# Stop all processes and restart
pkill -f efpolymer
npm run start
```

**Certificate errors**:
```bash
# Regenerate local certificates
cd backend
rm -rf data/certs
npm run start  # Will regenerate certificates
```

**Permission errors on macOS**:
```bash
# Grant full disk access in System Preferences > Privacy & Security
```

## License

Proprietary - EF Polymer Internal Use Only

## Support

For technical support:
1. Check the troubleshooting section above
2. Review application logs in the data directory
3. Contact the development team with error details

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Minimum Requirements**: Node.js 18+, 4GB RAM, 2GB disk space