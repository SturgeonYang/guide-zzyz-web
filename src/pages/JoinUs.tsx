import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Trophy,
  Heart,
  Code,
  Megaphone,
  FileEdit,
  Users,
  Gift,
  Target,
} from "lucide-react";
import { useIsMobile } from "../components/ui/use-mobile";

export default function JoinUs() {
  const isMobile = useIsMobile();
  const [selectedDepartment, setSelectedDepartment] = useState<
    number | null
  >(0);

  const reasons = [
    {
      icon: <Trophy className="w-12 h-12 md:w-14 md:h-14" />,
      title: "提升自我",
      description:
        "在团队中学习新技能，提升专业能力，积累实践经验，为未来的发展打下坚实基础。",
    },
    {
      icon: <Users className="w-12 h-12 md:w-14 md:h-14" />,
      title: "结识伙伴",
      description:
        "认识来自全国各地的优秀同龄人，建立深厚友谊，拓展人脉网络，共同成长进步。",
    },
    {
      icon: <Heart className="w-12 h-12 md:w-14 md:h-14" />,
      title: "传递温暖",
      description:
        "用自己的经验和知识帮助学弟学妹，为教育事业贡献一份力量，收获满满的成就感。",
    },
  ];

  const departments = [
    {
      name: "技术部",
      icon: <Code className="w-10 h-10 md:w-12 md:h-12" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      responsibilities: [
        "网站和小程序的开发与维护",
        "技术架构设计与优化",
        "数据分析与可视化",
        "自动化工具开发",
      ],
      requirements:
        "熟悉前端或后端开发，有一定的编程基础，对技术充满热情",
    },
    {
      name: "宣传部",
      icon: <Megaphone className="w-10 h-10 md:w-12 md:h-12" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      responsibilities: [
        "公众号推文设计与排版",
        "海报、宣传物料制作",
        "社交媒体运营与推广",
        "品牌形象维护",
      ],
      requirements:
        "擅长设计或新媒体运营，有创意思维，熟悉PS、PR等设计工具",
    },
    {
      name: "文稿部",
      icon: <FileEdit className="w-10 h-10 md:w-12 md:h-12" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      responsibilities: [
        "文章撰写与内容策划",
        "稿件审核与编辑",
        "采访学长学姐收集素材",
        "主题策划与内容创新",
      ],
      requirements:
        "文笔流畅，有良好的写作能力，对教育话题感兴趣",
    },
  ];

  const recruitmentFlow = [
    {
      title: "在线报名",
      icon: <FileEdit className="w-8 h-8 md:w-10 md:h-10" />,
      description: "填写报名表单，提交个人信息",
      color: "bg-purple-500",
    },
    {
      title: "简历初筛",
      icon: <Target className="w-8 h-8 md:w-10 md:h-10" />,
      description: "团队审核简历，筛选合适候选人",
      color: "bg-pink-500",
    },
    {
      title: "综合考核",
      icon: <Trophy className="w-8 h-8 md:w-10 md:h-10" />,
      description: "面试交流，完成部门任务考核",
      color: "bg-amber-500",
    },
    {
      title: "加入团队",
      icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" />,
      description: "成为正式成员，开启精彩旅程",
      color: "bg-green-500",
    },
  ];

  const teamMembers25 = [
    "蔡坤伶",
    "高洁",
    "廖心妍",
    "刘思辰",
    "林艺璇",
    "赖冠宏",
    "陈俊宇",
    "林亦乐",
    "林锦臻",
    "严妍",
    "肖子霖",
    "曾宇昊",
    "曾琪翔",
    
  ];

  const teamMembers24 = [
    "杨至铭",
    "庄宸",
    "方禹铭",
    "黄思钦",
    "徐婉娴",
    "陈辛夷",
    "何毅",
    "杨蒋淇",
    "陈楷润",
    "黎君乐",
  ];

  return (
    <div
      className="min-h-screen bg-[#F5F5F5]"
      style={{ paddingTop: "140px", paddingBottom: "80px" }}
    >
      <div
        className="container-custom max-w-5xl"
        style={{ margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: "64px" }}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black"
            style={{ marginBottom: "24px" }}
          >
            加入我们
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#707070" }}
          >
            成为求学指南酱的一员，一起创造更大的价值
          </p>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "64px" }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-black text-center"
            style={{ marginBottom: "32px" }}
          >
            加入我们的理由
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-lg transition-all"
                style={{ padding: "40px" }}
              >
                <div className="flex items-center md:block" style={{ marginBottom: props => window.innerWidth < 768 ? '5px' : '0' }}>
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 shrink-0 md:mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md text-white md:mb-5"
                    style={{ marginRight: "20px" }} // Mobile only effectively due to md:mx-auto overriding
                  >
                    {reason.icon}
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-black text-left md:text-center md:mb-4"
                  >
                    {reason.title}
                  </h3>
                </div>
                <p
                  className="text-base md:text-lg leading-relaxed text-left md:text-center"
                  style={{ color: "#707070", marginTop: "10px" }} // Added marginTop for mobile description
                >
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Departments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: "64px" }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-black text-center"
            style={{ marginBottom: "32px" }}
          >
            部门介绍
          </h2>

          {/* Department Tabs */}
          <div
            className="grid grid-cols-3 gap-3 md:gap-4"
            style={{ marginBottom: "24px" }}
          >
            {departments.map((dept, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedDepartment(index)}
                className={`py-4 md:py-5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                  selectedDepartment === index
                    ? "bg-[#0067D1] shadow-lg"
                    : "bg-white hover:bg-slate-50 shadow-md"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3
                  className="text-base md:text-lg lg:text-xl font-bold"
                  style={{
                    color:
                      selectedDepartment === index
                        ? "#FFFFFF"
                        : "#707070",
                  }}
                >
                  {dept.name}
                </h3>
              </motion.button>
            ))}
          </div>

          {/* Department Details */}
          <AnimatePresence mode="wait">
            {selectedDepartment !== null && (
              <motion.div
                key={selectedDepartment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-lg"
                style={{ padding: "40px" }}
              >
                <div className="flex flex-col md:flex-row items-start gap-0 md:gap-8">
                  <div className="flex items-center md:block md:w-auto md:shrink-0" style={{ marginBottom: "5px" }}>
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        duration: 0.4,
                      }}
                      className={`bg-gradient-to-br ${departments[selectedDepartment].color} text-white rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 shadow-md md:mx-0`}
                      style={{ marginRight: "20px" }}
                    >
                      {departments[selectedDepartment].icon}
                    </motion.div>
                    <h3
                      className="text-2xl font-bold text-black md:hidden"
                    >
                      {departments[selectedDepartment].name}
                    </h3>
                  </div>
                  <div className="flex-1 w-full">
                    <h3
                      className="hidden md:block text-3xl font-bold text-black text-left"
                      style={{ marginBottom: "24px" }}
                    >
                      {departments[selectedDepartment].name}
                    </h3>
                    <div style={{ 
                      marginBottom: isMobile ? "24px" : "24px",
                      marginTop: isMobile ? "12px" : "0"
                    }}>
                      <h4
                        className="text-lg md:text-xl font-bold text-black"
                        style={{ marginBottom: "16px" }}
                      >
                        主要职责
                      </h4>
                      <ul className="space-y-3">
                        {departments[
                          selectedDepartment
                        ].responsibilities.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: idx * 0.05,
                              duration: 0.3,
                            }}
                            className="flex items-start gap-3 text-base md:text-lg"
                            style={{ color: "#707070" }}
                          >
                            <span
                              className="text-[#0067D1] font-bold text-xl inline-block"
                              style={{ 
                                width: "12px", 
                                textAlign: "center",
                                marginTop: isMobile ? "-4px" : "0px"
                              }}
                            >
                              •
                            </span>
                            <span className="flex-1">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="bg-[#F5F5F5] rounded-xl"
                      style={{ padding: "24px" }}
                    >
                      <h4
                        className="text-base md:text-lg font-bold text-black"
                        style={{ marginBottom: "12px" }}
                      >
                        任职要求
                      </h4>
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "#707070" }}
                      >
                        {
                          departments[selectedDepartment]
                            .requirements
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recruitment Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginBottom: "64px" }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-black text-center"
            style={{ marginBottom: "32px" }}
          >
            招新流程
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {recruitmentFlow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-lg transition-all text-left md:text-center"
                style={{ padding: "32px 24px" }}
              >
                <div className="flex items-center md:block">
                  <div
                    className={`${step.color} text-white rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 md:mx-auto shadow-md md:mb-5`}
                    style={{ marginRight: "20px" }}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold text-black md:mb-3"
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "#707070", marginTop: "10px" }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-black text-center"
            style={{ marginBottom: "16px" }}
          >
            贡献者名单
          </h2>

          <p
            className="text-base md:text-lg text-center"
            style={{ color: "#707070", marginBottom: "24px" }}
          >
            感谢以下成员为团队做出的贡献
          </p>

          <div
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg"
            style={{ padding: "40px" }}
          >
            {/* Class of 24 */}
            <div style={{ marginBottom: "25px" }}>
              <h3 
                className="text-xl md:text-2xl font-bold pl-4 border-l-4 border-[#0067D1] text-gray-800"
                style={{ marginBottom: "15px" }}
              >
                24届
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {teamMembers24.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.01,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-[#FFFFFF] rounded-xl border border-slate-200 hover:border-[#0067D1] hover:shadow-md transition-all flex items-center justify-center"
                    style={{ padding: "12px", minHeight: "56px" }}
                  >
                    <p className="text-xs md:text-sm text-black font-medium text-center">
                      {member}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Class of 25 */}
            <div>
              <h3 
                className="text-xl md:text-2xl font-bold pl-4 border-l-4 border-[#0067D1] text-gray-800"
                style={{ marginBottom: "15px" }}
              >
                25届
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                {teamMembers25.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.01,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-[#FFFFFF] rounded-xl border border-slate-200 hover:border-[#0067D1] hover:shadow-md transition-all flex items-center justify-center"
                    style={{ padding: "12px", minHeight: "56px" }}
                  >
                    <p className="text-xs md:text-sm text-black font-medium text-center">
                      {member}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}