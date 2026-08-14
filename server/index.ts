import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import pool from './db';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';

dotenv.config();

const app  = express();
const PORT = Number(process.env.PORT ?? 4000);

// ── 中间件 ──────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin:      ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '10mb' })); // 支持大 base64 头像

// ── 路由 ─────────────────────────────────────────────────────────────────────
app.use('/api/auth',  authRouter);
app.use('/api/posts', postsRouter);

// ── 健康检查 ─────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── 初始化数据库表 ────────────────────────────────────────────────────────────
async function initDb(): Promise<void> {
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  await pool.query(schema);
  console.log('✓ 数据库表初始化完成');
}

// ── 启动服务器 ────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  try {
    await initDb();
    console.log(`✓ 后端服务运行在 http://localhost:${PORT}`);
  } catch (err) {
    console.error('数据库初始化失败:', err);
    process.exit(1);
  }
});
