import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { User, Post, AuthContextType, RegisterData } from "../types/auth";
import { authAPI, postsAPI, setToken, type UserPublic } from "../lib/api";

const AuthContext = createContext<AuthContextType | null>(null);

/** 将 API 返回的公开用户对象映射为前端 User（password 为空字符串） */
function toUser(u: UserPublic): User {
  return { ...u, password: "" };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 应用启动时：如果 localStorage 中有 token，则尝试拉取当前用户信息
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    authAPI
      .me()
      .then((u) => setUser(toUser(u)))
      .catch(() => {
        // token 已过期或无效 → 清除
        setToken(null);
      });
  }, []);

  // ── 登录 ────────────────────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await authAPI.login(email, password);
        if (res.success && res.token && res.user) {
          setToken(res.token);
          setUser(toUser(res.user));
        }
        return { success: res.success, message: res.message };
      } catch (err: unknown) {
        const e = err as { message?: string };
        return { success: false, message: e?.message ?? "登录失败，请稍后重试" };
      }
    },
    [],
  );

  // ── 注册 ────────────────────────────────────────────────────────────────────
  const register = useCallback(
    async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await authAPI.register(data);
        if (res.success && res.token && res.user) {
          setToken(res.token);
          setUser(toUser(res.user));
        }
        return { success: res.success, message: res.message };
      } catch (err: unknown) {
        const e = err as { message?: string };
        return { success: false, message: e?.message ?? "注册失败，请稍后重试" };
      }
    },
    [],
  );

  // ── 退出登录 ─────────────────────────────────────────────────────────────────
  const logout = useCallback((): void => {
    setToken(null);
    setUser(null);
  }, []);

  // ── 更新个人资料 ──────────────────────────────────────────────────────────────
  const updateProfile = useCallback(
    async (
      data: Partial<Pick<User, "username" | "avatar" | "grade" | "bio">>,
    ): Promise<{ success: boolean; message: string }> => {
      if (!user) return { success: false, message: "未登录" };
      try {
        const res = await authAPI.updateProfile(data);
        if (res.success && res.user) {
          setUser(toUser(res.user));
        }
        return { success: res.success, message: res.message };
      } catch (err: unknown) {
        const e = err as { message?: string };
        return { success: false, message: e?.message ?? "更新失败，请稍后重试" };
      }
    },
    [user],
  );

  // ── 获取当前用户投稿 ──────────────────────────────────────────────────────────
  const getUserPosts = useCallback(async (): Promise<Post[]> => {
    if (!user) return [];
    try {
      return await postsAPI.getMyPosts();
    } catch {
      return [];
    }
  }, [user]);

  // ── 新增投稿 ─────────────────────────────────────────────────────────────────
  const addPost = useCallback(
    async (
      post: Omit<Post, "id" | "userId" | "username" | "submittedAt" | "status">,
    ): Promise<void> => {
      if (!user) return;
      await postsAPI.addPost({
        category: post.category,
        fileName: post.fileName,
        fileSize: post.fileSize,
      });
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
        getUserPosts,
        addPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
