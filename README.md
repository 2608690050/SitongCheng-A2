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

# Charity Events Client (Assessment 2)

Static client (HTML + JS + CSS) that consumes the Node/Express API.

## Run locally
Open `index.html` in your browser, or serve the folder with a static server.
Default API base: `http://localhost:3000/api`.

Override API base:
```js
localStorage.setItem('API_BASE','http://localhost:3000/api');
location.reload();
```

## Pages
- `index.html` — Home page (active & upcoming events)
- `search.html` — Search/filter
- `event.html?id=<id>` — Event details
