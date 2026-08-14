-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id           VARCHAR(36)  PRIMARY KEY,
  username     VARCHAR(100) NOT NULL,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar       TEXT         DEFAULT '',
  grade        VARCHAR(20)  DEFAULT '',
  bio          TEXT         DEFAULT '',
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- 投稿表
CREATE TABLE IF NOT EXISTS posts (
  id           VARCHAR(36)  PRIMARY KEY,
  user_id      VARCHAR(36)  REFERENCES users(id) ON DELETE CASCADE,
  username     VARCHAR(100) NOT NULL,
  category     VARCHAR(50)  NOT NULL,
  file_name    VARCHAR(255) NOT NULL,
  file_size    BIGINT       NOT NULL,
  submitted_at TIMESTAMPTZ  DEFAULT NOW(),
  status       VARCHAR(20)  DEFAULT 'pending'
);
