/**
 * api.ts — 封装所有与后端的 HTTP 通信
 * 替代原来基于 localStorage 的 storage.ts
 */

import type { User, Post } from '../types/auth';

const API_BASE = '/api';

// ── Token 管理 ────────────────────────────────────────────────────────────────
export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

// ── 通用请求封装 ──────────────────────────────────────────────────────────────
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res  = await fetch(`${API_BASE}${url}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    // 将服务器返回的错误对象抛出，供调用方 catch
    throw data as { message?: string; success?: boolean };
  }
  return data as T;
}

// ── 公开的用户类型（不含密码）────────────────────────────────────────────────
export type UserPublic = Omit<User, 'password'>;

interface AuthResponse {
  success:  boolean;
  message:  string;
  token?:   string;
  user?:    UserPublic;
}

// ── Auth API ──────────────────────────────────────────────────────────────────
export const authAPI = {
  /** 注册 */
  register: (data: {
    username: string;
    email:    string;
    password: string;
    grade:    string;
  }): Promise<AuthResponse> =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body:   JSON.stringify(data),
    }),

  /** 登录 */
  login: (email: string, password: string): Promise<AuthResponse> =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body:   JSON.stringify({ email, password }),
    }),

  /** 获取当前登录用户信息（需 token） */
  me: (): Promise<UserPublic> =>
    request<UserPublic>('/auth/me'),

  /** 更新当前用户资料（需 token） */
  updateProfile: (
    data: Partial<Pick<User, 'username' | 'avatar' | 'grade' | 'bio'>>,
  ): Promise<AuthResponse & { user?: UserPublic }> =>
    request<AuthResponse & { user?: UserPublic }>('/auth/me', {
      method: 'PUT',
      body:   JSON.stringify(data),
    }),
};

// ── Posts API ─────────────────────────────────────────────────────────────────
export const postsAPI = {
  /** 获取当前用户的投稿列表（需 token） */
  getMyPosts: (): Promise<Post[]> =>
    request<Post[]>('/posts'),

  /** 新增投稿记录（需 token） */
  addPost: (data: {
    category: string;
    fileName: string;
    fileSize: number;
  }): Promise<Post> =>
    request<Post>('/posts', {
      method: 'POST',
      body:   JSON.stringify(data),
    }),
};
