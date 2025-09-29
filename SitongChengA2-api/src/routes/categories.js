import { Router } from 'express';
import pool from '../event_db.js';
const router = Router();
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, description FROM categories ORDER BY name');
    res.json({ success: true, data: rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
export default router;
