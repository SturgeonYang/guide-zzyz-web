import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Heart,
  MessageSquare,
  Share2,
  BookOpen,
  Mail,
  QrCode,
} from "lucide-react";
import Hero from "@/assets/home/hero.png";
import ImageQrCode from "@/assets/home/contact/qr.jpg";
import ImageGroup from "@/assets/home/net/img-group.png";
import ImageOfficialAccount from "@/assets/home/net/img-official-account.png";
export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [currentMember, setCurrentMember] = useState(0);

  const platforms = [
    {
      id: 0,
      name: "求学指南酱公众号",
      icon: (
        <MessageSquare className="w-9 h-9 md:w-10 md:h-10" />
      ),
      description:
        "我们的主要内容发布平台，定期推送优质学习经验文章、升学指导内容和教育资讯。关注公众号,第一时间获取最新的学习资源和活动信息。",
      features: [
        "每周精选文章",
        "升学资讯推送",
        "互动答疑服务",
      ],
      image: ImageOfficialAccount,
    },
    {
      id: 1,
      name: "志愿帮帮群",
      icon: <Users className="w-9 h-9 md:w-10 md:h-10" />,
      description:
        "汇聚全国各地的学生和家长，提供一对一的志愿填报咨询和经验分享。在这里，你可以找到志同道合的伙伴，获得学长学姐的宝贵建议。",
      features: ["一对一咨询", "经验交流分享", "最新政策解读"],
      image: ImageGroup,
    },
    {
      id: 2,
      name: "指南论坛",
      icon: <Share2 className="w-9 h-9 md:w-10 md:h-10" />,
      description:
        "开放的学习交流社区，涵盖学习方法、专业选择、院校信息等多个板块。在论坛中自由讨论，分享你的故事，寻找问题的答案。",
      features: [
        "多板块讨论区",
        "精华内容沉淀",
        "积分激励机制",
      ],
      image: null,
    },
  ];

  const teamMembers = [
    {
      name: "张晓明",
      role: "技术部负责人",
      university: "清华大学计算机系",
      description:
        "负责团队技术架构设计和开发工作，擅长前后端开发和系统优化。曾参与多个大型项目的开发，致力于用技术赋能教育。",
      avatar: (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
          张
        </div>
      ),
    },
    {
      name: "李雨晴",
      role: "宣传部负责人",
      university: "北京大学新闻与传播学院",
      description:
        "擅长内容策划和新媒体运营，带领团队打造了多个爆款文章。热爱教育事业，希望通过优质内容帮助更多学生找到适合自己的发展道路。",
      avatar: (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
          李
        </div>
      ),
    },
    {
      name: "王子轩",
      role: "文稿部负责人",
      university: "复旦大学中文系",
      description:
        "负责内容审核和编辑工作，确保每一篇文章的质量。拥有丰富的写作经验，擅长用生动的语言讲述教育故事。",
      avatar: (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
          王
        </div>
      ),
    },
    {
      name: "陈思琪",
      role: "运营总监",
      university: "上海交通大学管理学院",
      description:
        "负责团队整体运营和项目管理，协调各部门工作。具有敏锐的市场洞察力，善于挖掘用户需求，推动团队持续成长。",
      avatar: (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
          陈
        </div>
      ),
    },
  ];

  const nextMember = () => {
    if (currentMember < teamMembers.length - 1) {
      setCurrentMember(currentMember + 1);
    }
  };

  const prevMember = () => {
    if (currentMember > 0) {
      setCurrentMember(currentMember - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={Hero}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/75"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 container-custom mx-auto"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 md:mb-10 drop-shadow-2xl tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            求学指南酱
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg mb-10 md:mb-12 font-normal px-4"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            我们是一群来自全国各地名校的学生，致力于为高中生和大学生提供最真实、最有价值的学习经验和升学指导。
            在这里，你可以找到学长学姐的宝贵经验，获得专业的升学建议，与志同道合的伙伴共同成长。
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <button
              onClick={() => (window.location.href = "#guides")}
              className="inline-flex items-center gap-3 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105 active:scale-95"
              style={{
                paddingLeft: "48px",
                paddingRight: "48px",
                paddingTop: "20px",
                paddingBottom: "20px",
                backgroundColor: "#0067D1",
                color: "#FFFFFF",
                fontSize: "20px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "#0052a8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "#0067D1")
              }
            >
              <BookOpen className="w-6 h-6" />
              浏览指南
            </button>

            <button
              onClick={() =>
                (window.location.href = "/join-us")
              }
              className="inline-flex items-center gap-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2"
              style={{
                paddingLeft: "48px",
                paddingRight: "48px",
                paddingTop: "20px",
                paddingBottom: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                borderColor: "#F5F5F5",
                color: "#FFFFFF",
                fontSize: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "#F5F5F5";
                e.currentTarget.style.color = "#0067D1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
            >
              <Users className="w-6 h-6" />
              加入我们
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Introduction */}
      <section className="section-spacing">
        <div
          className="container-custom max-w-5xl"
          style={{ margin: "0 auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
            style={{ marginBottom: "48px" }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black text-center"
              style={{ marginBottom: "32px" }}
            >
              团队介绍
            </h2>
            <p className="text-base md:text-lg text-[#48556a] leading-relaxed text-center">
              求学指南酱团队成立于2024年，由一群热爱教育、乐于分享的优秀大学生组成。我们来自北京大学、复旦大学、上海交通大学等全国顶尖高校，涵盖理工科、人文社科等多个专业领域。
            </p>
            <p
              className="text-base md:text-lg text-[#48556a] leading-relaxed text-center"
              style={{ marginTop: "16px" }}
            >
              我们深知求学路上的迷茫与困惑，因此希望通过自己的经验和努力，为学弟学妹们点亮前行的道路。无论是学习方法、专业选择、还是升学规划，我们都愿意倾囊相授，与你一起成长。
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                label: "优质文章",
                value: "50+",
                gradient: "from-amber-300 to-amber-400",
              },
              {
                icon: Users,
                label: "服务学生",
                value: "300+",
                gradient: "from-purple-300 to-purple-400",
              },
              {
                icon: Heart,
                label: "用心服务",
                value: "100%",
                gradient: "from-rose-300 to-rose-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="bg-white rounded-3xl md:rounded-[40px] shadow-md hover:shadow-lg transition-all flex flex-col"
                style={{ padding: "32px 28px" }}
              >
                <div
                  className="flex items-center gap-10"
                  style={{ marginBottom: "0" }}
                >
                  <div
                    className={`w-[75px] h-[75px] md:w-[91px] md:h-[91px] rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                  >
                    <item.icon className="w-11 h-11 md:w-[52px] md:h-[52px] text-white" />
                  </div>
                  <p
                    className="text-[#48556a] font-bold"
                    style={{ fontSize: "28px" }}
                  >
                    {item.label}
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p
                    className="font-extrabold text-black"
                    style={{
                      fontSize: "86px",
                      lineHeight: "1.1",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Network */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div
          className="container-custom max-w-5xl"
          style={{ margin: "0 auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black text-center"
              style={{ marginBottom: "29px" }}
            >
              指南网络
            </h2>

            {/* Platform Icons */}
            <div
              className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12"
              style={{ marginBottom: "53px" }}
            >
              {platforms.map((platform, index) => (
                <motion.button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(index)}
                  className={`rounded-[24px] transition-all duration-300 shadow-md ${
                    selectedPlatform === index
                      ? "bg-[#0067D1] text-white shadow-xl"
                      : "bg-white text-[#A8A8A8] hover:bg-slate-50 hover:text-[#0067D1]"
                  }`}
                  style={{
                    padding: "24px",
                  }}
                  animate={{
                    scale: selectedPlatform === index ? 1.1 : 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {platform.icon}
                </motion.button>
              ))}
            </div>

            {/* Platform Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center"
                    style={{
                      boxShadow:
                        "0 4px 20px rgba(0, 0, 0, 0.08), 0 -2px 10px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {platforms[selectedPlatform].image ? (
                      <img
                        src={platforms[selectedPlatform].image}
                        alt={platforms[selectedPlatform].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
                        style={{ minHeight: "360px" }}
                      >
                        <div className="text-center">
                          <BookOpen className="w-16 h-16 md:w-20 md:h-20 text-slate-400 mx-auto mb-4" />
                          <p className="text-xl md:text-2xl font-bold text-slate-500">
                            正在建设中
                          </p>
                          <p className="text-sm md:text-base text-slate-400 mt-2">
                            敬请期待
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#FFFFFF] rounded-2xl md:rounded-3xl shadow-lg flex flex-col justify-center"
                    style={{ padding: "36px 52px" }}
                  >
                    <h3
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-black"
                      style={{ marginBottom: "20px" }}
                    >
                      {platforms[selectedPlatform].name}
                    </h3>
                    <p
                      className="text-base md:text-lg text-[#48556a] leading-relaxed"
                      style={{ marginBottom: "28px" }}
                    >
                      {platforms[selectedPlatform].description}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {platforms[selectedPlatform].features.map(
                        (feature, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-xl shadow-sm"
                            style={{ padding: "16px 20px" }}
                          >
                            <p className="text-sm md:text-base text-[#0067D1] font-semibold">
                              {feature}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Team Members Carousel */}
      <section className="section-spacing">
        <div
          className="container-custom max-w-5xl"
          style={{ margin: "0 auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black text-center"
              style={{ marginBottom: "10px" }}
            >
              核心成员
            </h2>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMember}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-2xl md:rounded-3xl lg:rounded-[32px] shadow-xl mx-auto flex items-center"
                  style={{ marginBottom: "10px", minHeight: "280px", padding: "24px 24px" }}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 w-full">
                    <div className="flex-shrink-0">
                      {teamMembers[currentMember].avatar}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                        {teamMembers[currentMember].name}
                      </h3>
                      <p className="text-lg md:text-xl text-[#0067D1] mb-2 font-semibold">
                        {teamMembers[currentMember].role}
                      </p>
                      <p className="text-base md:text-lg text-[#707070] mb-4 flex items-center justify-center md:justify-start gap-2">
                        <BookOpen className="w-5 h-5" />
                        {teamMembers[currentMember].university}
                      </p>
                      <p className="text-sm md:text-base text-[#707070] leading-relaxed">
                        {teamMembers[currentMember].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div
                className="flex justify-center items-center gap-6"
                style={{ marginTop: "10px" }}
              >
                <motion.button
                  onClick={prevMember}
                  disabled={currentMember === 0}
                  className={`p-4 md:p-5 rounded-full transition-all ${
                    currentMember === 0
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-[#0067D1] text-white hover:bg-[#0052a8] shadow-lg"
                  }`}
                  whileHover={
                    currentMember === 0 ? {} : { scale: 1.1 }
                  }
                  whileTap={
                    currentMember === 0 ? {} : { scale: 0.9 }
                  }
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
                </motion.button>

                <div className="flex items-center gap-2">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMember(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentMember
                          ? "w-10 bg-[#0067D1]"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextMember}
                  disabled={
                    currentMember === teamMembers.length - 1
                  }
                  className={`p-4 md:p-5 rounded-full transition-all ${
                    currentMember === teamMembers.length - 1
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-[#0067D1] text-white hover:bg-[#0052a8] shadow-lg"
                  }`}
                  whileHover={
                    currentMember === teamMembers.length - 1
                      ? {}
                      : { scale: 1.1 }
                  }
                  whileTap={
                    currentMember === teamMembers.length - 1
                      ? {}
                      : { scale: 0.9 }
                  }
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div
          className="container-custom max-w-5xl"
          style={{ margin: "0 auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-8 md:mb-12 text-center">
              联系我们
            </h2>
            <p
              className="text-base md:text-lg text-[#48556a] text-center"
              style={{ marginBottom: "40px" }}
            >
              欢迎通过以下方式与我们取得联系
            </p>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {/* Left side - Contact Cards */}
              <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white rounded-2xl md:rounded-3xl transition-all shadow-md hover:shadow-lg"
                  style={{ padding: "28px 24px" }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <Mail className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      邮箱联系
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#48556a]" style={{ marginBottom: '12px' }}>
                    发送邮件至我们的官方邮箱，我们会尽快回复您的问题
                  </p>
                  <a
                    href="mailto:guide_zzyz@163.com"
                    className="text-[#0067D1] font-semibold text-base md:text-lg hover:underline inline-block"
                  >
                    guide_zzyz@163.com
                  </a>
                </motion.div>

                {/* WeChat Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white rounded-2xl md:rounded-3xl transition-all shadow-md hover:shadow-lg"
                  style={{ padding: "28px 24px" }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <QrCode className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-black">
                      微信公众号
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#48556a]">
                    扫描右侧二维码关注我们的微信公众号，获取最新资讯
                  </p>
                </motion.div>
              </div>

              {/* Right side - QR Code */}
              <div style={{ flex: '0 0 auto', display: 'flex', minWidth: '280px' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-lg w-full flex flex-col justify-center items-center"
                  style={{ padding: '32px', textAlign: 'center' }}
                >
                  <div className="w-48 h-48 md:w-56 md:h-56 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm mx-auto overflow-hidden" style={{ marginBottom: '16px' }}>
                    <img
                      src={ImageQrCode}
                      alt="公众号二维码"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base md:text-lg font-bold text-black" style={{ marginBottom: '4px' }}>
                    求学指南酱
                  </p>
                  <p className="text-sm text-[#707070]">
                    微信公众号
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}