import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import pool from '../db';
import { authenticate, type AuthRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? 'guide-zzyz-dev-secret-change-in-prod';

// ── POST /api/auth/register ────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { username, email, password, grade } = req.body as {
    username: string; email: string; password: string; grade: string;
  };

  if (!username || username.trim().length < 2)
    return res.status(400).json({ success: false, message: '用户名至少需要2个字符' });
  if (!email)
    return res.status(400).json({ success: false, message: '邮箱不能为空' });
  if (!password || password.length < 6)
    return res.status(400).json({ success: false, message: '密码至少需要6位' });

  try {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()],
    );
    if (rows.length > 0)
      return res.status(400).json({ success: false, message: '该邮箱已被注册' });

    const passwordHash = await bcrypt.hash(password, 10);
    const id        = randomUUID();
    const createdAt = new Date().toISOString();

    await pool.query(
      `INSERT INTO users (id, username, email, password_hash, avatar, grade, bio, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, username.trim(), email.toLowerCase().trim(), passwordHash, '', grade ?? '', '', createdAt],
    );

    const token = jwt.sign({ userId: id, username: username.trim() }, JWT_SECRET, { expiresIn: '30d' });

    return res.json({
      success: true,
      message: '注册成功',
      token,
      user: {
        id,
        username: username.trim(),
        email:    email.toLowerCase().trim(),
        avatar:   '',
        grade:    grade ?? '',
        bio:      '',
        createdAt,
      },
    });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()],
    );
    if (rows.length === 0)
      return res.status(400).json({ success: false, message: '该邮箱尚未注册' });

    const u = rows[0];
    const valid = await bcrypt.compare(password, u.password_hash);
    if (!valid)
      return res.status(400).json({ success: false, message: '密码错误' });

    const token = jwt.sign({ userId: u.id, username: u.username }, JWT_SECRET, { expiresIn: '30d' });

    return res.json({
      success: true,
      message: '登录成功',
      token,
      user: {
        id:        u.id,
        username:  u.username,
        email:     u.email,
        avatar:    u.avatar   ?? '',
        grade:     u.grade    ?? '',
        bio:       u.bio      ?? '',
        createdAt: u.created_at,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, username, email, avatar, grade, bio, created_at FROM users WHERE id = $1',
      [req.userId],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: '用户不存在' });

    const u = rows[0];
    return res.json({
      id:        u.id,
      username:  u.username,
      email:     u.email,
      avatar:    u.avatar   ?? '',
      grade:     u.grade    ?? '',
      bio:       u.bio      ?? '',
      createdAt: u.created_at,
    });
  } catch (err) {
    console.error('me error:', err);
    return res.status(500).json({ message: '服务器内部错误' });
  }
});

// ── PUT /api/auth/me ──────────────────────────────────────────────────────────
router.put('/me', authenticate, async (req: AuthRequest, res) => {
  const data = req.body as {
    username?: string;
    avatar?:   string;
    grade?:    string;
    bio?:      string;
  };

  if (data.username !== undefined && data.username.trim().length < 2)
    return res.status(400).json({ success: false, message: '用户名至少需要2个字符' });

  const setClauses: string[] = [];
  const values: unknown[]    = [];
  let   idx = 1;

  if (data.username !== undefined) { setClauses.push(`username = $${idx++}`); values.push(data.username.trim()); }
  if (data.avatar   !== undefined) { setClauses.push(`avatar   = $${idx++}`); values.push(data.avatar); }
  if (data.grade    !== undefined) { setClauses.push(`grade    = $${idx++}`); values.push(data.grade); }
  if (data.bio      !== undefined) { setClauses.push(`bio      = $${idx++}`); values.push(data.bio); }

  if (setClauses.length === 0)
    return res.status(400).json({ success: false, message: '没有要更新的字段' });

  values.push(req.userId);

  try {
    await pool.query(`UPDATE users SET ${setClauses.join(', ')} WHERE id = $${idx}`, values);

    const { rows } = await pool.query(
      'SELECT id, username, email, avatar, grade, bio, created_at FROM users WHERE id = $1',
      [req.userId],
    );
    const u = rows[0];

    return res.json({
      success: true,
      message: '资料更新成功',
      user: {
        id:        u.id,
        username:  u.username,
        email:     u.email,
        avatar:    u.avatar   ?? '',
        grade:     u.grade    ?? '',
        bio:       u.bio      ?? '',
        createdAt: u.created_at,
      },
    });
  } catch (err) {
    console.error('update profile error:', err);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

export default router;
