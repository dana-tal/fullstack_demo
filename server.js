import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Session setup
app.use(session({
  secret: 'mysecret123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // change to true if using https
}));

// API routes
app.get('/api/increment', (req, res) => {
  if (!req.session.counter) req.session.counter = 0;
  req.session.counter++;
  res.json({ counter: req.session.counter });
});

app.get('/api/counter', (req, res) => {
  res.json({ counter: req.session.counter || 0 });
});

// Serve React build
const clientBuildPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));

// For React Router support: return index.html for any other request
app.use((req, res, next) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));