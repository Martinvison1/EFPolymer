# EF Polymer CRM API Documentation

## Base URL
```
https://localhost:8443/api/v1
```

## Authentication

The API uses HTTP-only cookie-based authentication with JWT tokens.

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@local",
  "password": "ChangeMe!123"
}
```

**Response (200 OK):**
```json
{
  "id": "user_123",
  "email": "admin@local", 
  "name": "Admin User",
  "role": "admin",
  "locale": "en",
  "timeZone": "UTC"
}
```

### Logout
```http
POST /auth/logout
```

### Get Current User
```http
GET /auth/me
```

## Accounts

### List Accounts
```http
GET /accounts?limit=25&offset=0&q=search&sort=name:asc
```

**Query Parameters:**
- `limit`: Results per page (1-200, default: 25)
- `offset`: Pagination offset (default: 0)
- `q`: Search query (searches name, region, segment)
- `sort`: Sort field and direction (e.g., "name:asc", "createdAt:desc")

**Response:**
```json
{
  "data": [
    {
      "id": "acc_123",
      "name": "Finca Sol de Almería",
      "type": "farmer",
      "region": "Andalusia", 
      "segment": "horticulture",
      "size": "medium",
      "website": "https://example.com",
      "notes": "Leading tomato grower...",
      "tags": ["sustainable", "tomatoes"],
      "createdAt": "2025-01-20T10:00:00Z",
      "updatedAt": "2025-01-20T10:00:00Z",
      "_count": {
        "contacts": 3,
        "opportunities": 2,
        "tickets": 1
      }
    }
  ],
  "meta": {
    "totalCount": 150,
    "offset": 0,
    "limit": 25,
    "hasMore": true
  }
}
```

### Create Account
```http
POST /accounts
Content-Type: application/json

{
  "name": "New Farm Ltd",
  "type": "farmer",
  "region": "Valencia",
  "segment": "citrus",
  "size": "large", 
  "website": "https://newfarm.example.com",
  "notes": "Potential customer for citrus applications",
  "tags": ["citrus", "large-scale"]
}
```

### Get Account
```http
GET /accounts/acc_123
```

### Update Account
```http
PATCH /accounts/acc_123
Content-Type: application/json

{
  "notes": "Updated notes about this account"
}
```

### Delete Account
```http
DELETE /accounts/acc_123
```

## Opportunities

### List Opportunities
```http
GET /opportunities?stage=trial_planned&limit=25
```

### Create Opportunity
```http
POST /opportunities
Content-Type: application/json

{
  "accountId": "acc_123",
  "name": "Almería tomato fields 2025",
  "stage": "trial_planned",
  "currency": "EUR",
  "amount": 35000.00,
  "probability": 75,
  "expectedClose": "2025-03-01T00:00:00Z",
  "efpSoilType": "sandy",
  "efpClimateZone": "semi-arid", 
  "efpCrop": "tomato",
  "efpIrrigation": "drip",
  "efpApplication": "in-furrow",
  "efpDosageKgHa": 15.0,
  "efpExpectedWaterSavingsPct": 25.0,
  "efpExpectedYieldUpliftPct": 8.0,
  "efpExpectedROI": 2.5
}
```

### Move Pipeline Stage
```http
POST /opportunities/opp_123/move
Content-Type: application/json

{
  "stage": "trial_running",
  "notes": "Trial started successfully"
}
```

## Trials

### Create Trial
```http
POST /trials
Content-Type: application/json

{
  "opportunityId": "opp_123",
  "siteName": "Greenhouse Block A",
  "locationLat": 36.8381,
  "locationLng": -2.4597,
  "startDate": "2025-02-01T00:00:00Z",
  "endDate": "2025-05-01T00:00:00Z",
  "protocolVersion": "EFP-TRIAL-v2.1",
  "hasControl": true,
  "status": "planned"
}
```

### Add Measurement
```http
POST /trials/trial_123/measurements
Content-Type: application/json

{
  "date": "2025-02-15T12:00:00Z",
  "soilMoisturePct": 18.5,
  "irrigationVolumeL": 1250.0,
  "rainfallMm": 2.1,
  "temperatureC": 22.3,
  "yieldEstimate": 85.2,
  "sampleNotes": "Good plant development observed"
}
```

### Get Trial Analytics
```http
GET /trials/trial_123/analytics
```

**Response:**
```json
{
  "waterSavingsPct": 23.4,
  "yieldUpliftPct": 12.8,
  "roi": 3.2,
  "measurements": 12,
  "duration": 89,
  "charts": {
    "soilMoisture": [...],
    "irrigation": [...],
    "yield": [...]
  }
}
```

## Products & Pricing

### List Products
```http
GET /products?active=true
```

### Get Product Prices
```http
GET /products/prod_123/prices?region=EU
```

**Response:**
```json
[
  {
    "id": "price_123",
    "region": "EU",
    "currency": "EUR", 
    "minQty": 1,
    "unitPrice": 85.00,
    "validFrom": "2025-01-01T00:00:00Z",
    "validTo": null
  }
]
```

## Quotes

### Create Quote
```http
POST /quotes
Content-Type: application/json

{
  "opportunityId": "opp_123",
  "currency": "EUR",
  "validUntil": "2025-03-01T00:00:00Z",
  "lines": [
    {
      "productId": "prod_123",
      "description": "EF Polymer Soil Conditioner 25kg",
      "qty": 20,
      "unitPrice": 78.00,
      "discountPct": 5
    }
  ]
}
```

### Generate Quote PDF
```http
POST /quotes/quote_123/pdf
```

**Response:**
```json
{
  "documentId": "doc_456",
  "downloadUrl": "/api/v1/documents/doc_456/download"
}
```

## Activities

### Create Activity
```http
POST /activities
Content-Type: application/json

{
  "relatedType": "opportunity",
  "relatedId": "opp_123", 
  "type": "call",
  "subject": "Follow-up call about trial results",
  "dueAt": "2025-02-01T14:00:00Z",
  "location": "Phone call",
  "notes": "Discuss trial progress and next steps"
}
```

## Documents

### Upload Document
```http
POST /documents
Content-Type: multipart/form-data

file: [binary file data]
name: "Trial Protocol v2.1"
type: "protocol"
linkedType: "trial"
linkedId: "trial_123"
tags: ["protocol", "v2.1"]
```

### Download Document
```http
GET /documents/doc_123/download
```

## Reports & Analytics

### Dashboard Data
```http
GET /reports/dashboard
```

### Export Data
```http
GET /reports/export?type=opportunities&format=csv
```

### Pipeline Forecast
```http
GET /reports/forecast?currency=EUR&months=3
```

## System & Maintenance

### Health Check
```http
GET /system/health
```

### Create Backup
```http
POST /backups
Content-Type: application/json

{
  "notes": "Manual backup before upgrade"
}
```

### List Backups
```http
GET /backups?limit=10
```

### Restore Backup
```http
POST /backups/restore
Content-Type: application/json

{
  "backupId": "backup_123",
  "dryRun": false
}
```

## Error Responses

All errors follow this format:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limits

- Short: 10 requests per second
- Medium: 20 requests per 10 seconds  
- Long: 100 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```

## Pagination

List endpoints support pagination with these parameters:

- `limit`: Number of results (1-200, default 25)
- `offset`: Starting position (default 0)

Response includes pagination metadata:
```json
{
  "data": [...],
  "meta": {
    "totalCount": 1250,
    "offset": 50, 
    "limit": 25,
    "hasMore": true
  }
}
```

## Filtering & Search

Most list endpoints support:

- `q`: Full-text search query
- `sort`: Sort field and direction (e.g., "name:asc", "createdAt:desc")  
- Field-specific filters (e.g., `stage=trial_planned`, `status=active`)

Example:
```http
GET /opportunities?q=tomato&stage=trial_running&sort=expectedClose:asc
```