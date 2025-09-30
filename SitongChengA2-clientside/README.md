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
