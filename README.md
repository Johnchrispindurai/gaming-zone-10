# GAMEZONE — Experiment No. 10

A gaming-themed server-side website using Node.js built-in `http` module.

## Requirements
- Node.js installed
- Visual Studio Code or another code editor

## Run
Open a terminal in this folder and run:

```bash
node server.js
```

Then open http://localhost:3000 in your browser.

## Routes
- `/` — Home page
- `/home` — Gaming hub
- `/games` — Featured games
- `/about` — About GAMEZONE
- Any unknown route — 404 page

The server handles GET requests, sends HTTP response headers and status codes,
and displays the request URL and method on each page. Other HTTP methods receive
a 405 Method Not Allowed response.

## Lab concepts demonstrated
- `http.createServer()` creates the HTTP server.
- `res.writeHead()` sends the status code and response headers.
- `res.end()` sends the HTML response and ends it.
- `server.listen()` starts listening on port 3000.
