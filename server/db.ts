import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host:     process.env.PG_HOST     ?? 'localhost',
  port:     Number(process.env.PG_PORT ?? 5432),
  database: process.env.PG_DATABASE ?? 'guide_zzyz',
  user:     process.env.PG_USER     ?? 'postgres',
  password: process.env.PG_PASSWORD ?? '',
});

// 连接测试
pool.connect((err, _client, done) => {
  if (err) {
    console.error('PostgreSQL 连接失败:', err.message);
  } else {
    console.log('✓ PostgreSQL 连接成功');
    done();
  }
});

export default pool;
