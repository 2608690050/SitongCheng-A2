# Charity Events API (Assessment 2)

## Prerequisites
- Node.js 18+
- MySQL 8.x

## Setup
1. Create DB & seed data:
   - Run `sql/charityevents_db.sql` in MySQL.

2. Configure environment:
   - Write`.env` and fill DB credentials.

3. Install & run:
```bash
npm install
npm run start
```
API base: `http://localhost:3000/api`

## Endpoints
- `GET /api/health`
- `GET /api/categories`
- `GET /api/events/home`
- `GET /api/events` (q, location, category_id, date_from, date_to, status)
- `GET /api/events/:id`
