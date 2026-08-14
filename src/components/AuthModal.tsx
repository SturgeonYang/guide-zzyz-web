import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Eye, EyeOff, User, Mail, Lock, GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

const GRADE_OPTIONS = [
  "初一", "初二", "初三",
  "高一", "高二", "高三",
  "大一", "大二", "大三", "大四",
  "研一", "研二", "研三",
  "已毕业",
];

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regGrade, setRegGrade] = useState("");

  const resetForm = () => {
    setError("");
    setLoginEmail("");
    setLoginPassword("");
    setRegUsername("");
    setRegEmail("");
    setRegPassword("");
    setRegGrade("");
    setShowPassword(false);
  };

  const handleTabSwitch = (t: "login" | "register") => {
    setTab(t);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail.trim() || !loginPassword) {
      setError("请填写完整信息");
      return;
    }
    setLoading(true);
    const result = await login(loginEmail.trim(), loginPassword);
    setLoading(false);
    if (result.success) {
      handleClose();
    } else {
      setError(result.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!regUsername.trim() || !regEmail.trim() || !regPassword || !regGrade) {
      setError("请填写所有必填项");
      return;
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(regEmail.trim())) {
      setError("请输入有效的邮箱地址");
      return;
    }
    setLoading(true);
    const result = await register({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword,
      grade: regGrade,
    });
    setLoading(false);
    if (result.success) {
      handleClose();
    } else {
      setError(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ width: 420, maxWidth: "calc(100vw - 64px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0067D1] to-cyan-500" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div style={{ padding: "32px 36px 36px" }}>
              {/* Tab switcher */}
              <div className="flex rounded-2xl bg-[#F5F5F5] p-1 mb-8">
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTabSwitch(t)}
                    className={`flex-1 py-2.5 rounded-xl text-base font-bold transition-all duration-200 ${
                      tab === t
                        ? "bg-white text-[#0067D1] shadow-sm"
                        : "text-[#A8A8A8] hover:text-slate-600"
                    }`}
                  >
                    {t === "login" ? "登录" : "注册"}
                  </button>
                ))}
              </div>

              {/* Login Form */}
              {tab === "login" && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="邮箱地址"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="密码"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 px-4 rounded-xl">
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-3.5 rounded-xl text-white text-base font-bold transition-all"
                    style={{
                      background: loading
                        ? "#A8A8A8"
                        : "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)",
                      boxShadow: loading ? "none" : "0 4px 16px rgba(0,103,209,0.35)",
                    }}
                  >
                    {loading ? "登录中..." : "登录"}
                  </motion.button>

                  <p className="text-center text-sm text-[#707070]">
                    还没有账号？{" "}
                    <button
                      type="button"
                      onClick={() => handleTabSwitch("register")}
                      className="text-[#0067D1] font-bold hover:underline"
                    >
                      立即注册
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Register Form */}
              {tab === "register" && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="用户名（至少2个字符）"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="邮箱地址"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="密码（至少6位）"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      value={regGrade}
                      onChange={(e) => setRegGrade(e.target.value)}
                      className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-base focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all appearance-none cursor-pointer"
                      style={{ color: regGrade ? "#000" : "#A8A8A8" }}
                    >
                      <option value="" disabled>选择年级</option>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g} style={{ color: "#000" }}>{g}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 px-4 rounded-xl">
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-3.5 rounded-xl text-white text-base font-bold transition-all"
                    style={{
                      background: loading
                        ? "#A8A8A8"
                        : "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)",
                      boxShadow: loading ? "none" : "0 4px 16px rgba(0,103,209,0.35)",
                    }}
                  >
                    {loading ? "注册中..." : "注册"}
                  </motion.button>

                  <p className="text-center text-sm text-[#707070]">
                    已有账号？{" "}
                    <button
                      type="button"
                      onClick={() => handleTabSwitch("login")}
                      className="text-[#0067D1] font-bold hover:underline"
                    >
                      立即登录
                    </button>
                  </p>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
