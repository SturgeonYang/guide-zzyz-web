import { Router } from 'express';
import { randomUUID } from 'crypto';
import pool from '../db';
import { authenticate, type AuthRequest } from '../middleware/auth';

const router = Router();

// ── GET /api/posts — 当前用户的投稿列表 ──────────────────────────────────────
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM posts WHERE user_id = $1 ORDER BY submitted_at DESC',
      [req.userId],
    );

    return res.json(
      rows.map((p) => ({
        id:          p.id,
        userId:      p.user_id,
        username:    p.username,
        category:    p.category,
        fileName:    p.file_name,
        fileSize:    Number(p.file_size),
        submittedAt: p.submitted_at,
        status:      p.status,
      })),
    );
  } catch (err) {
    console.error('get posts error:', err);
    return res.status(500).json({ message: '服务器内部错误' });
  }
});

// ── POST /api/posts — 新增投稿记录 ──────────────────────────────────────────
router.post('/', authenticate, async (req: AuthRequest, res) => {
  const { category, fileName, fileSize } = req.body as {
    category: string;
    fileName: string;
    fileSize: number;
  };

  if (!category || !fileName)
    return res.status(400).json({ message: '分区和文件名不能为空' });

  try {
    const id  = randomUUID();
    const now = new Date().toISOString();

    await pool.query(
      `INSERT INTO posts (id, user_id, username, category, file_name, file_size, submitted_at, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, req.userId, req.username, category, fileName, fileSize ?? 0, now, 'pending'],
    );

    return res.status(201).json({
      id,
      userId:      req.userId,
      username:    req.username,
      category,
      fileName,
      fileSize:    fileSize ?? 0,
      submittedAt: now,
      status:      'pending',
    });
  } catch (err) {
    console.error('add post error:', err);
    return res.status(500).json({ message: '服务器内部错误' });
  }
});

export default router;
