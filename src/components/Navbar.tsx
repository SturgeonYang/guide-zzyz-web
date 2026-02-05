import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/assets/nav/logo.png"

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled more than 80vh (when hero section is about to leave)
      const heroHeight = window.innerHeight * 0.8;
      setScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar style based on page and scroll position
  const getNavbarStyle = () => {
    if (isHomePage && !scrolled) {
      // Transparent navbar on home page at top
      return {
        background: "bg-transparent",
        border: "border-none",
        shadow: "",
        textColor: "text-white",
      };
    } else {
      // Blur navbar on other pages or when scrolled
      return {
        background: "bg-white/80 backdrop-blur-lg",
        border: "border-b border-slate-200/50",
        shadow: "shadow-lg",
        textColor: "text-black",
      };
    }
  };

  const navStyle = getNavbarStyle();

  const navLinks = [
    { path: "/", label: "首页" },
    { path: "/submit", label: "投稿" },
    { path: "/join-us", label: "加入我们" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navStyle.background} ${navStyle.border} ${navStyle.shadow}`}
    >
      <div className="container-custom">
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
                  paddingRight:
                    index === navLinks.length - 1 ? "0px" : "24px",
                  marginRight: index === navLinks.length - 1 ? "0px" : "18px",
                }}
              >
                <span
                  style={{
                    fontSize: "21px",
                    fontWeight: "600",
                  }}
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
                      left: '20px',
                      right: index === navLinks.length - 1 ? '-4px' : '20px'
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            ))}
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
            className="md:hidden py-6 border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-4 text-center text-lg font-bold transition-all ${
                  location.pathname === link.path
                    ? "text-[#0067D1] bg-blue-50/50"
                    : "text-[#48556a] hover:text-[#0067D1] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}