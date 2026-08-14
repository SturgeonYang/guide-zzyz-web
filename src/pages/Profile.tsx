import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useIsMobile } from "../components/ui/use-mobile";
import {
  User,
  Mail,
  GraduationCap,
  FileText,
  Edit3,
  LogOut,
  Camera,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../types/auth";

const GRADE_OPTIONS = [
  "初一", "初二", "初三",
  "高一", "高二", "高三",
  "大一", "大二", "大三", "大四",
  "研一", "研二", "研三",
  "已毕业",
];

const CATEGORY_LABELS: Record<string, string> = {
  study: "学习经验",
  exam: "考试心得",
  college: "大学生活",
  application: "升学申请",
  career: "职业规划",
  other: "其他",
};

function StatusBadge({ status }: { status: Post["status"] }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
        <Clock className="w-3 h-3" /> 审核中
      </span>
    );
  }
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
        <CheckCircle className="w-3 h-3" /> 已通过
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500">
      <XCircle className="w-3 h-3" /> 已拒绝
    </span>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, isLoggedIn, logout, updateProfile, getUserPosts } = useAuth();

  const [activeTab, setActiveTab] = useState<"info" | "posts">("info");
  const [editing, setEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editBio, setEditBio] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user) {
      getUserPosts().then(setPosts);
    }
  }, [user, getUserPosts]);

  if (!user) return null;

  const startEditing = () => {
    setEditUsername(user.username);
    setEditGrade(user.grade);
    setEditBio(user.bio);
    setSaveError("");
    setSaveSuccess(false);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setSaveError("");
  };

  const saveProfile = async () => {
    setSaveError("");
    const result = await updateProfile({ username: editUsername, grade: editGrade, bio: editBio });
    if (result.success) {
      setSaveSuccess(true);
      setEditing(false);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      setSaveError(result.message);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("请选择图片文件"); return; }
    if (file.size > 2 * 1024 * 1024) { alert("图片大小不能超过 2MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => updateProfile({ avatar: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const sideNavItems = [
    { key: "info" as const, label: "个人资料", icon: LayoutDashboard },
    { key: "posts" as const, label: "我的投稿", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ paddingTop: "88px", paddingBottom: "60px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 0" }}>

        {/* ── Page title row ── */}
        <div style={{ marginBottom: "28px" }}>
          <h1 className="text-3xl font-extrabold text-black">个人中心</h1>
          <p className="text-base text-[#707070]" style={{ marginTop: "6px" }}>
            管理你的账号信息与投稿记录
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "300px 1fr", gap: "24px", alignItems: "start" }}>

          {/* ════ LEFT SIDEBAR ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              {/* Mini banner */}
              <div
                style={{
                  height: "80px",
                  background: "linear-gradient(135deg, #0067D1 0%, #0052a8 60%, #003c8f 100%)",
                }}
              />

              <div style={{ padding: "0 24px 24px" }}>
                {/* Avatar */}
                <div style={{ marginTop: "-40px", marginBottom: "14px" }}>
                  <div className="relative group" style={{ width: "fit-content" }}>
                    <div
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {user.avatar
                        ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                        : <User className="w-9 h-9 text-white" />}
                    </div>
                    <div
                      className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                </div>

                {/* Name & meta */}
                <h2 className="text-xl font-extrabold text-black" style={{ marginBottom: "6px" }}>
                  {user.username}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#707070]">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </span>
                  {user.grade && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#707070]">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      {user.grade}
                    </span>
                  )}
                  <span className="text-xs text-[#A8A8A8]" style={{ marginTop: "2px" }}>
                    注册于 {formatDate(user.createdAt)}
                  </span>
                </div>

                {user.bio && (
                  <p className="text-sm text-[#48556a]" style={{ marginTop: "12px", lineHeight: 1.6 }}>
                    {user.bio}
                  </p>
                )}

                {/* Stats row */}
                <div
                  className="border-t border-slate-100"
                  style={{ marginTop: "16px", paddingTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
                >
                  <div className="text-center bg-[#F5F5F5] rounded-2xl" style={{ padding: "10px 8px" }}>
                    <p className="text-2xl font-extrabold text-[#0067D1]">{posts.length}</p>
                    <p className="text-xs text-[#707070] font-semibold">投稿数</p>
                  </div>
                  <div className="text-center bg-[#F5F5F5] rounded-2xl" style={{ padding: "10px 8px" }}>
                    <p className="text-2xl font-extrabold text-green-500">
                      {posts.filter((p) => p.status === "approved").length}
                    </p>
                    <p className="text-xs text-[#707070] font-semibold">已通过</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation menu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
              style={{ padding: "8px" }}
            >
              {sideNavItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="w-full flex items-center gap-3 rounded-2xl text-base font-semibold transition-all"
                  style={{
                    padding: "13px 16px",
                    background: activeTab === key ? "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)" : "transparent",
                    color: activeTab === key ? "#fff" : "#48556a",
                  }}
                >
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: activeTab === key ? "#fff" : "#0067D1" }}
                  />
                  {label}
                  {key === "posts" && (
                    <span
                      className="ml-auto text-xs font-bold rounded-full px-2 py-0.5"
                      style={{
                        background: activeTab === key ? "rgba(255,255,255,0.25)" : "#e8f0fe",
                        color: activeTab === key ? "#fff" : "#0067D1",
                      }}
                    >
                      {posts.length}
                    </span>
                  )}
                </button>
              ))}

              {/* Divider */}
              <div className="h-px bg-slate-100" style={{ margin: "6px 8px" }} />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-2xl text-base font-semibold text-[#707070] hover:bg-red-50 hover:text-red-500 transition-all"
                style={{ padding: "13px 16px" }}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                退出登录
              </button>
            </motion.div>
          </div>

          {/* ════ RIGHT CONTENT ════ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white rounded-3xl shadow-md"
            style={{ padding: "36px 40px 40px" }}
          >

            {/* ── Info Tab ── */}
            {activeTab === "info" && (
              <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>

                {/* Tab header */}
                <div className="flex items-center justify-between" style={{ marginBottom: "28px" }}>
                  <div>
                    <h2 className="text-2xl font-extrabold text-black">个人资料</h2>
                    <p className="text-sm text-[#707070]" style={{ marginTop: "4px" }}>
                      管理你的账号基本信息
                    </p>
                  </div>
                  {!editing && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={startEditing}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0067D1] text-white text-sm font-bold hover:bg-[#0052a8] transition-all shadow-md"
                    >
                      <Edit3 className="w-4 h-4" />
                      编辑资料
                    </motion.button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {editing ? (
                    /* ── Edit form ── */
                    <motion.div
                      key="edit-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Two-col grid for username + grade */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <div>
                          <label className="block text-sm font-bold text-black" style={{ marginBottom: "8px" }}>用户名</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              value={editUsername}
                              onChange={(e) => setEditUsername(e.target.value)}
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-black" style={{ marginBottom: "8px" }}>年级</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                              value={editGrade}
                              onChange={(e) => setEditGrade(e.target.value)}
                              className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all appearance-none cursor-pointer"
                            >
                              <option value="">不填写</option>
                              {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Bio full-width */}
                      <div style={{ marginBottom: "20px" }}>
                        <label className="block text-sm font-bold text-black" style={{ marginBottom: "8px" }}>个人简介</label>
                        <textarea
                          value={editBio}
                          onChange={(e) => setEditBio(e.target.value.slice(0, 200))}
                          rows={4}
                          placeholder="简单介绍一下自己..."
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all resize-none"
                        />
                        <p className="text-xs text-[#A8A8A8] text-right" style={{ marginTop: "4px" }}>{editBio.length}/200</p>
                      </div>

                      {saveError && (
                        <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2.5 px-4 rounded-xl" style={{ marginBottom: "16px" }}>
                          {saveError}
                        </p>
                      )}

                      <div style={{ display: "flex", gap: "12px" }}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={saveProfile}
                          className="flex items-center justify-center gap-2 text-white text-base font-bold rounded-xl shadow-md"
                          style={{ flex: 1, padding: "13px 0", background: "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)" }}
                        >
                          <Check className="w-5 h-5" /> 保存更改
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={cancelEditing}
                          className="flex items-center justify-center gap-2 border-2 border-slate-200 text-[#707070] text-base font-bold rounded-xl hover:border-slate-300 transition-all"
                          style={{ flex: 1, padding: "13px 0" }}
                        >
                          <X className="w-5 h-5" /> 取消
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── View mode ── */
                    <motion.div key="view-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {saveSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-xl font-semibold text-sm"
                          style={{ marginBottom: "20px" }}
                        >
                          <CheckCircle className="w-4 h-4" /> 资料更新成功！
                        </motion.div>
                      )}

                      {/* Info grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                        {[
                          { icon: User, label: "用户名", value: user.username },
                          { icon: GraduationCap, label: "年级", value: user.grade || "未填写" },
                          { icon: Mail, label: "邮箱", value: user.email, wide: true },
                        ].map(({ icon: Icon, label, value, wide }) => (
                          <div
                            key={label}
                            className="flex items-center gap-4 bg-[#F5F5F5] rounded-2xl"
                            style={{ padding: "16px 18px", gridColumn: wide ? "1 / -1" : undefined }}
                          >
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-[#0067D1]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-[#A8A8A8] font-semibold" style={{ marginBottom: "3px" }}>{label}</p>
                              <p className="text-base text-black font-medium truncate">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bio */}
                      <div className="bg-[#F5F5F5] rounded-2xl" style={{ padding: "18px" }}>
                        <p className="text-xs text-[#A8A8A8] font-semibold" style={{ marginBottom: "8px" }}>个人简介</p>
                        <p className="text-base text-[#48556a]" style={{ lineHeight: 1.7 }}>
                          {user.bio || '暂无简介，点击「编辑资料」添加'}
                        </p>
                      </div>

                      {/* Avatar hint */}
                      <div
                        className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 text-[#A8A8A8] text-sm font-medium cursor-pointer hover:border-[#0067D1] hover:text-[#0067D1] transition-all"
                        style={{ padding: "14px 18px", marginTop: "14px" }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="w-5 h-5 flex-shrink-0" />
                        点击左侧头像或此处更换头像（支持 JPG / PNG，≤ 2 MB）
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── Posts Tab ── */}
            {activeTab === "posts" && (
              <motion.div key="posts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>

                <div className="flex items-center justify-between" style={{ marginBottom: "28px" }}>
                  <div>
                    <h2 className="text-2xl font-extrabold text-black">我的投稿</h2>
                    <p className="text-sm text-[#707070]" style={{ marginTop: "4px" }}>
                      共 {posts.length} 条投稿记录
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/submit")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0067D1] text-white text-sm font-bold hover:bg-[#0052a8] transition-all shadow-md"
                  >
                    <FileText className="w-4 h-4" />
                    去投稿
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Status summary bar */}
                {posts.length > 0 && (
                  <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}
                  >
                    {[
                      { label: "审核中", count: posts.filter((p) => p.status === "pending").length, color: "#f59e0b", bg: "#fffbeb" },
                      { label: "已通过", count: posts.filter((p) => p.status === "approved").length, color: "#10b981", bg: "#f0fdf4" },
                      { label: "已拒绝", count: posts.filter((p) => p.status === "rejected").length, color: "#ef4444", bg: "#fef2f2" },
                    ].map(({ label, count, color, bg }) => (
                      <div key={label} className="rounded-2xl text-center" style={{ background: bg, padding: "14px 8px" }}>
                        <p className="text-2xl font-extrabold" style={{ color }}>{count}</p>
                        <p className="text-xs font-semibold text-[#707070]">{label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {posts.length === 0 ? (
                  <div className="text-center" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                    <div
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mx-auto"
                      style={{ marginBottom: "16px" }}
                    >
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-lg font-bold text-black" style={{ marginBottom: "8px" }}>还没有投稿记录</p>
                    <p className="text-base text-[#707070]" style={{ marginBottom: "24px" }}>
                      分享你的学习经验，帮助更多学弟学妹！
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate("/submit")}
                      className="px-8 py-3 rounded-2xl text-white text-base font-bold shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)" }}
                    >
                      立即投稿
                    </motion.button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {posts.map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-4 bg-[#F5F5F5] rounded-2xl hover:shadow-md transition-all"
                        style={{ padding: "16px 20px" }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-black truncate">{post.fileName}</p>
                          <div className="flex items-center gap-3" style={{ marginTop: "4px" }}>
                            <span className="text-xs text-[#707070] bg-white px-2.5 py-0.5 rounded-lg font-medium">
                              {CATEGORY_LABELS[post.category] || post.category}
                            </span>
                            <span className="text-xs text-[#A8A8A8]">
                              {formatDate(post.submittedAt)}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={post.status} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
          {/* ════ END RIGHT ════ */}

        </div>
      </div>
    </div>
  );
}
