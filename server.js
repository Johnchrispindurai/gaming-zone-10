const http = require("http");

const PORT = 3000;

const games = [
  {
    name: "Valorant",
    category: "FPS / Tactical",
    description: "Team-based tactical action and competitive gameplay.",
    emoji: "🎯"
  },
  {
    name: "Cyberpunk 2077",
    category: "Open World",
    description: "Explore a futuristic city full of action and adventure.",
    emoji: "🌆"
  },
  {
    name: "Battle Arena",
    category: "Action / Adventure",
    description: "Enter the arena, challenge your rivals and win.",
    emoji: "⚔️"
  }
];

function pageTemplate(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | GAMEZONE</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', Arial, sans-serif;
      color: #f8fafc;
      background: #080b14;
      min-height: 100vh;
    }
    header {
      padding: 22px 8%;
      background: #0d1222;
      border-bottom: 1px solid #252b40;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .logo {
      color: white;
      text-decoration: none;
      font: 800 25px 'Orbitron', sans-serif;
    }
    .logo span { color: #a855f7; }
    nav { display: flex; gap: 24px; flex-wrap: wrap; }
    nav a {
      color: #cbd5e1;
      text-decoration: none;
      font-size: 14px;
      transition: .2s;
    }
    nav a:hover { color: #c084fc; }
    .hero {
      padding: 85px 8%;
      min-height: 430px;
      display: flex;
      align-items: center;
      background:
        radial-gradient(circle at 80% 30%, #6d28d944, transparent 35%),
        radial-gradient(circle at 15% 80%, #2563eb33, transparent 35%),
        #080b14;
    }
    .hero-inner { max-width: 760px; }
    .eyebrow {
      color: #c084fc;
      letter-spacing: 3px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 18px;
    }
    h1 {
      font: 800 clamp(38px, 7vw, 68px)/1.2 'Orbitron', sans-serif;
      margin-bottom: 22px;
    }
    h1 span { color: #a855f7; }
    .lead {
      color: #aab3c5;
      max-width: 620px;
      line-height: 1.9;
      margin-bottom: 28px;
    }
    .button {
      display: inline-block;
      padding: 13px 22px;
      border-radius: 7px;
      background: linear-gradient(90deg, #9333ea, #4f46e5);
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 0 22px #9333ea44;
    }
    main { padding: 55px 8%; }
    h2 {
      font: 700 27px 'Orbitron', sans-serif;
      margin-bottom: 18px;
    }
    .muted { color: #aab3c5; line-height: 1.9; }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      margin-top: 28px;
    }
    .card {
      background: #111827;
      border: 1px solid #30364d;
      border-radius: 12px;
      padding: 25px;
      transition: .2s;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: #a855f7;
    }
    .game-emoji { font-size: 34px; margin-bottom: 15px; }
    .card h3 { margin-bottom: 9px; }
    .category { color: #c084fc; font-size: 12px; margin-bottom: 12px; }
    .card p { color: #aab3c5; font-size: 13px; line-height: 1.7; }
    .info {
      margin-top: 25px;
      padding: 18px;
      border: 1px solid #30364d;
      background: #0d1222;
      border-radius: 9px;
      color: #94a3b8;
      font-size: 13px;
      line-height: 1.9;
    }
    footer {
      margin-top: 35px;
      padding: 28px 8%;
      text-align: center;
      color: #8993a8;
      background: #0d1222;
      border-top: 1px solid #252b40;
      font-size: 12px;
    }
    footer strong { color: #c084fc; }
    @media (max-width: 700px) {
      header { flex-direction: column; }
      nav { justify-content: center; gap: 15px; }
      .cards { grid-template-columns: 1fr; }
      .hero { padding: 65px 7%; }
      main { padding: 45px 7%; }
    }
  </style>
</head>
<body>
  <header>
    <a class="logo" href="/">GAME<span>ZONE.</span></a>
    <nav>
      <a href="/">Home</a>
      <a href="/home">Gaming Hub</a>
      <a href="/games">Games</a>
      <a href="/about">About</a>
    </nav>
  </header>

  ${content}

  <footer>
    <p><strong>GAMEZONE</strong> — Level up your gaming experience.</p>
    <p>© 2026 GAMEZONE. All Rights Reserved.</p>
  </footer>
</body>
</html>`;
}

function renderGames() {
  return games.map((game) => `
    <article class="card">
      <div class="game-emoji">${game.emoji}</div>
      <h3>${game.name}</h3>
      <div class="category">${game.category}</div>
      <p>${game.description}</p>
    </article>
  `).join("");
}

function sendPage(req, res, statusCode, title, content) {
  res.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });

  res.end(pageTemplate(title, `
    <main>
      ${content}
      <div class="info">
        <strong>Server request details</strong><br>
        Request URL: ${req.url}<br>
        Request Method: ${req.method}<br>
        HTTP Status Code: ${statusCode}
      </div>
    </main>
  `));
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": "GET"
    });
    return res.end("405 - Method Not Allowed");
  }

  const path = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  if (path === "/" || path === "/home") {
    return sendPage(req, res, 200, "Home", `
      <section class="hero">
        <div class="hero-inner">
          <p class="eyebrow">THE ULTIMATE GAMING EXPERIENCE</p>
          <h1>PLAY MORE.<br><span>WIN BIGGER.</span></h1>
          <p class="lead">
            Welcome to GAMEZONE! Discover exciting games, explore new
            adventures and take your gaming experience to the next level.
          </p>
          <a class="button" href="/games">Explore Games →</a>
        </div>
      </section>
      <section>
        <h2>Welcome, Gamer!</h2>
        <p class="muted">
          Your gaming journey starts here. Visit our games page to explore
          featured titles or learn more about our gaming community.
        </p>
      </section>
    `);
  }

  if (path === "/games") {
    return sendPage(req, res, 200, "Games", `
      <p class="eyebrow">DISCOVER YOUR NEXT ADVENTURE</p>
      <h2>Featured Games</h2>
      <p class="muted">Explore some of the games featured in GAMEZONE.</p>
      <div class="cards">${renderGames()}</div>
    `);
  }

  if (path === "/about") {
    return sendPage(req, res, 200, "About", `
      <p class="eyebrow">WHO WE ARE</p>
      <h2>About GAMEZONE</h2>
      <p class="muted">
        GAMEZONE is an online gaming website concept created for passionate
        gamers. Our goal is to bring gaming content and players together in
        one exciting digital space.
      </p>
      <div class="cards">
        <article class="card">
          <div class="game-emoji">🎮</div>
          <h3>Our Mission</h3>
          <p>Make discovering games simple, fun and accessible.</p>
        </article>
        <article class="card">
          <div class="game-emoji">🏆</div>
          <h3>Our Vision</h3>
          <p>Create a welcoming place for gaming enthusiasts.</p>
        </article>
        <article class="card">
          <div class="game-emoji">⚡</div>
          <h3>Our Experience</h3>
          <p>Enjoy a clean, responsive and gaming-inspired website.</p>
        </article>
      </div>
    `);
  }

  return sendPage(req, res, 404, "Page Not Found", `
    <p class="eyebrow">404 ERROR</p>
    <h2>Page Not Found</h2>
    <p class="muted">The page you requested does not exist.</p>
    <a class="button" href="/">Return to Home</a>
  `);
});

server.listen(PORT, () => {
  console.log(`GAMEZONE server running at http://localhost:${PORT}`);
});
