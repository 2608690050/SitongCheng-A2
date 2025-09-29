import { Router } from 'express';
import pool from '../event_db.js';
const router = Router();

router.get('/home', async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.id, e.name, e.short_description, e.event_date, e.event_time, e.location,
             e.city, e.state, e.postcode, e.image_url, e.ticket_price, e.goal_amount, e.raised_amount,
             c.name AS category
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.status = 'active'
      ORDER BY e.event_date ASC, e.event_time ASC
    `);
    res.json({ success: true, data: rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/', async (req, res) => {
  try {
    const { q, location, category_id, date_from, date_to, status } = req.query;
    const where = []; const args = [];
    if (status) {
      if (status === 'active') where.push("e.status = 'active'");
      else if (status === 'suspended') where.push("e.status = 'suspended'");
      else if (status === 'past') where.push("e.event_date < CURDATE()");
    } else where.push("e.status = 'active'");
    if (q) { where.push("(e.name LIKE ? OR e.short_description LIKE ? OR e.full_description LIKE ?)"); const like = `%${q}%`; args.push(like, like, like); }
    if (location) { where.push("(e.location LIKE ? OR e.city LIKE ? OR e.state LIKE ? OR e.postcode LIKE ?)"); const s = `%${location}%`; args.push(s, s, s, s); }
    if (category_id) { where.push("e.category_id = ?"); args.push(Number(category_id)); }
    if (date_from) { where.push("e.event_date >= ?"); args.push(date_from); }
    if (date_to) { where.push("e.event_date <= ?"); args.push(date_to); }
    const sql = `
      SELECT e.id, e.name, e.short_description, e.event_date, e.event_time, e.location,
             e.city, e.state, e.postcode, e.image_url, e.ticket_price, e.goal_amount, e.raised_amount,
             c.name AS category
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY e.event_date ASC, e.event_time ASC
      LIMIT 200
    `;
    const [rows] = await pool.query(sql, args);
    res.json({ success: true, data: rows });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query(`
      SELECT e.*, c.name AS category, o.name AS organisation, o.website AS organisation_website
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN organisations o ON e.organisation_id = o.id
      WHERE e.id = ?
      LIMIT 1
    `, [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: rows[0] });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
export default router;
