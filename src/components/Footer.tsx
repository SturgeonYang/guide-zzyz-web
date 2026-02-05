import {
  Mail,
  MessageSquare,
  Github,
  Twitter,
} from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        backgroundColor: "#2c3e50",
        marginTop: "0",
        borderTop: "1px solid #34495e",
      }}
    >
      <div
        className="container-custom max-w-5xl"
        style={{
          margin: "0 auto",
          paddingTop: "40px",
          paddingBottom: "40px",
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: isMobile ? "center" : "flex-start",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "32px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Quick Links - 最左侧 */}
          <div
            style={{
              flex: "0 0 auto",
              minWidth: "150px",
              marginLeft: isMobile ? "0" : "40px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  首页
                </a>
              </li>
              <li>
                <a
                  href="/submit"
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  投稿
                </a>
              </li>
              <li>
                <a
                  href="/join-us"
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                  className="hover:text-white transition-colors"
                >
                  加入我们
                </a>
              </li>
            </ul>
          </div>

          {/* Contact - 中间 */}
          <div style={{ flex: "0 0 auto", minWidth: "200px", width: isMobile ? "100%" : "auto" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              联系方式
            </h3>
            <ul className="space-y-2">
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: "8px",
                }}
              >
                <Mail
                  className="w-3 h-3"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  guide_zzyz@163.com
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: "8px",
                }}
              >
                <MessageSquare
                  className="w-3 h-3"
                  style={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  微信公众号：求学指南酱
                </span>
              </li>
            </ul>
          </div>

          {/* Social - 最右侧，完全贴边 */}
          <div
            style={{
              flex: "0 0 auto",
              minWidth: "120px",
              marginRight: "0",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              关注我们
            </h3>
            <div style={{ display: "flex", gap: "8px", justifyContent: isMobile ? "center" : "flex-start" }}>
              <a
                href="#"
                className="p-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#0067D1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#0067D1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#0067D1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Copyright © 2024 - 2026 求学指南团队. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}