import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './event_db.js';
import eventsRouter from './routes/events.js';
import categoriesRouter from './routes/categories.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, message: 'API is healthy' }); }
  catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[API] http://localhost:${PORT}`));
