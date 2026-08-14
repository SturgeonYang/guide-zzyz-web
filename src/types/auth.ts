export interface User {
  id:        string;
  username:  string;
  email:     string;
  /** API 迁移后不再通过前端传递密码，保留字段以兼容已有代码，值为空字符串 */
  password:  string;
  avatar:    string; // base64 or URL
  grade:     string; // 年级，如 "高一", "高二", "大一" 等
  bio:       string;
  createdAt: string;
}

export interface Post {
  id:          string;
  userId:      string;
  username:    string;
  category:    string;
  fileName:    string;
  fileSize:    number;
  submittedAt: string;
  status:      "pending" | "approved" | "rejected";
}

export interface AuthContextType {
  user:          User | null;
  isLoggedIn:    boolean;
  login:         (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register:      (data: RegisterData)              => Promise<{ success: boolean; message: string }>;
  logout:        () => void;
  updateProfile: (data: Partial<Pick<User, "username" | "avatar" | "grade" | "bio">>) => Promise<{ success: boolean; message: string }>;
  getUserPosts:  () => Promise<Post[]>;
  addPost:       (post: Omit<Post, "id" | "userId" | "username" | "submittedAt" | "status">) => Promise<void>;
}

export interface RegisterData {
  username: string;
  email:    string;
  password: string;
  grade:    string;
}
