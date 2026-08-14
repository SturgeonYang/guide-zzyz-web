import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Logo from "@/assets/nav/logo.png";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        const threshold = window.innerHeight * 0.8;
        setScrolled(window.scrollY > threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavbarStyle = () => {
    if (isMobile) {
      return {
        background: "backdrop-blur-xl",
        style: { backgroundColor: "rgba(255, 255, 255, 0.9)" },
        border: "border-b border-white/20",
        shadow: "shadow-sm",
        textColor: "text-slate-900",
      };
    }

    if (isHomePage && !scrolled) {
      return {
        background: "bg-transparent",
        style: {},
        border: "border-none",
        shadow: "",
        textColor: "text-white",
      };
    } else {
      return {
        background: "backdrop-blur-xl",
        style: { backgroundColor: "rgba(255, 255, 255, 0.9)" },
        border: "border-b border-slate-200/50",
        shadow: "shadow-lg",
        textColor: "text-slate-900",
      };
    }
  };

  const navStyle = getNavbarStyle();
  const isLight = !isHomePage || scrolled || isMobile;

  const navLinks = [
    { path: "/", label: "首页" },
    { path: "/submit", label: "投稿" },
    { path: "/community", label: "论坛" },
    { path: "/join-us", label: "加入我们" },
  ];

  const openLogin = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthModalTab("register");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Background Layer */}
        <div
          className={`absolute inset-0 -z-10 transition-all duration-300 ${navStyle.background} ${navStyle.border} ${navStyle.shadow}`}
          style={navStyle.style}
        />

        <div className="container-custom relative">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="h-10 lg:h-12 flex items-center"
              >
                <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
              </motion.div>
              <span
                className={`text-xl lg:text-2xl font-extrabold whitespace-nowrap transition-colors duration-300 ${navStyle.textColor}`}
              >
                求学指南酱
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative py-2"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: index === navLinks.length - 1 ? "0px" : "24px",
                    marginRight: index === navLinks.length - 1 ? "0px" : "18px",
                  }}
                >
                  <span
                    style={{ fontSize: "21px", fontWeight: "600" }}
                    className={`transition-colors duration-200 ${
                      location.pathname === link.path
                        ? isHomePage && !scrolled
                          ? "text-white"
                          : "text-[#0067D1]"
                        : isHomePage && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-[#A8A8A8] hover:text-[#0067D1]"
                    }`}
                  >
                    {link.label}
                  </span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute bottom-0 h-1 rounded-full ${
                        isHomePage && !scrolled ? "bg-white" : "bg-[#0067D1]"
                      }`}
                      style={{
                        left: "20px",
                        right: index === navLinks.length - 1 ? "-4px" : "20px",
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              ))}

              {/* Auth / User Area */}
              <div className="ml-[42px]" ref={dropdownRef}>
                {isLoggedIn && user ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 focus:outline-none"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40 shadow-md bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-base font-semibold transition-colors duration-200 ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {user.username}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-12 min-w-max bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                        >
                          <button
                            onClick={() => { navigate("/profile"); setUserDropdownOpen(false); }}
                            className="w-full flex items-center gap-2.5 whitespace-nowrap text-base font-semibold text-slate-700 hover:bg-[#F5F5F5] transition-colors"
                            style={{ padding: "16px 20px" }}
                          >
                            <Settings style={{ width: 18, height: 18, flexShrink: 0 }} className="text-[#0067D1]" />
                            个人中心
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 whitespace-nowrap text-base font-semibold text-red-500 hover:bg-red-50 transition-colors"
                            style={{ padding: "16px 20px" }}
                          >
                            <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />
                            退出登录
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={openLogin}
                      className={`py-2 transition-colors duration-200 ${
                        isHomePage && !scrolled
                          ? "text-white/80 hover:text-white"
                          : "text-[#A8A8A8] hover:text-[#0067D1]"
                      }`}
                      style={{ fontSize: "21px", fontWeight: "600", paddingLeft: "24px", paddingRight: "6px" }}
                    >
                      登录
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={openRegister}
                      className={`py-2 transition-colors duration-200 ${
                        isHomePage && !scrolled
                          ? "text-white/80 hover:text-white"
                          : "text-[#A8A8A8] hover:text-[#0067D1]"
                      }`}
                      style={{ fontSize: "21px", fontWeight: "600", paddingLeft: "6px", paddingRight: "0px" }}
                    >
                      注册
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${navStyle.textColor}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t backdrop-blur-xl shadow-xl flex flex-col min-h-[50vh]"
              style={{
                paddingBlock: "15px",
                gap: "10px",
                borderTopColor: "#4e505257",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-6 py-4 text-center text-lg font-bold transition-all ${
                    location.pathname === link.path
                      ? "text-[#0067D1]"
                      : "text-slate-900 hover:text-[#0067D1]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-slate-200 mx-6" />

              {isLoggedIn && user ? (
                <>
                  <button
                    onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}
                    className="block px-6 py-4 text-center text-lg font-bold text-slate-900 hover:text-[#0067D1] transition-all"
                  >
                    个人中心（{user.username}）
                  </button>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="block px-6 py-3 mx-6 text-center text-base font-bold text-red-500 border-2 border-red-200 rounded-xl hover:bg-red-50 transition-all"
                  >
                    退出登录
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-6 pt-2">
                  <button
                    onClick={openLogin}
                    className="py-3 text-center text-base font-bold text-[#0067D1] border-2 border-[#0067D1] rounded-xl hover:bg-blue-50 transition-all"
                  >
                    登录
                  </button>
                  <button
                    onClick={openRegister}
                    className="py-3 text-center text-base font-bold text-white rounded-xl shadow-md transition-all"
                    style={{ background: "linear-gradient(135deg, #0067D1 0%, #0052a8 100%)" }}
                  >
                    注册
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}