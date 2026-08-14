import type { User, Post } from "../types/auth";

const USERS_KEY = "guide_zzyz_users";
const CURRENT_USER_KEY = "guide_zzyz_current_user";
const POSTS_KEY = "guide_zzyz_posts";

// --- Users ---
export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function upsertUser(user: User): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  saveUsers(users);
}

// --- Session ---
export function getCurrentUserId(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function setCurrentUserId(id: string | null): void {
  if (id === null) {
    localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    localStorage.setItem(CURRENT_USER_KEY, id);
  }
}

// --- Posts ---
export function getPosts(): Post[] {
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]): void {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function getPostsByUserId(userId: string): Post[] {
  return getPosts().filter((p) => p.userId === userId);
}

export function addPost(post: Post): void {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
}

// --- Utils ---
export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
