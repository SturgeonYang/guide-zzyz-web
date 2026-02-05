import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Mail, CheckCircle, X } from "lucide-react";

export default function Submit() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categories = [
    { value: "study", label: "学习经验" },
    { value: "exam", label: "考试心得" },
    { value: "college", label: "大学生活" },
    { value: "application", label: "升学申请" },
    { value: "career", label: "职业规划" },
    { value: "other", label: "其他" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && isValidFile(file)) {
      setUploadedFile(file);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [".zip", ".rar", ".7z", ".tar", ".gz"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    return validTypes.includes(fileExtension);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && uploadedFile) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedCategory("");
        setUploadedFile(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="container-custom max-w-5xl" style={{ margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: '64px' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black" style={{ marginBottom: '24px' }}>
            投稿中心
          </h1>
          <p className="text-lg md:text-xl" style={{ color: '#707070' }}>
            分享你的学习经验，帮助更多的学弟学妹
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-md"
          style={{ padding: '40px', marginBottom: '64px' }}
        >
          <div className="flex items-start gap-4 md:gap-6" style={{ marginBottom: '24px' }}>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <FileText className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ marginTop: '8px' }}>
              投稿须知
            </h2>
          </div>
          <div className="space-y-5 text-base md:text-lg" style={{ color: '#707070' }}>
            <p className="flex items-start gap-4">
              <span className="text-[#0067D1] font-bold text-xl" style={{ marginTop: '4px' }}>•</span>
              <span>
                支持的文件格式：Word文档（.doc, .docx），可包含图片
              </span>
            </p>
            <p className="flex items-start gap-4">
              <span className="text-[#0067D1] font-bold text-xl" style={{ marginTop: '4px' }}>•</span>
              <span>
                上传方式：请将文档打包为压缩文件（支持 .zip, .rar, .7z, .tar, .gz
                格式）
              </span>
            </p>
            <p className="flex items-start gap-4">
              <span className="text-[#0067D1] font-bold text-xl" style={{ marginTop: '4px' }}>•</span>
              <span>
                邮件投稿：可直接发送至{" "}
                <a
                  href="mailto:guide_zzyz@163.com"
                  className="text-[#0067D1] underline font-semibold hover:text-[#0052a8]"
                >
                  guide_zzyz@163.com
                </a>
              </span>
            </p>
            <p className="flex items-start gap-4">
              <span className="text-[#0067D1] font-bold text-xl" style={{ marginTop: '4px' }}>•</span>
              <span>内容要求：真实、原创、对他人有帮助的学习经验和建议</span>
            </p>
          </div>
        </motion.div>

        {/* Submit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-lg"
          style={{ padding: '40px' }}
        >
          <form onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div style={{ marginBottom: '10px' }}>
              <label className="block text-lg md:text-xl font-bold text-black mb-4">
                选择投稿分区
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-white text-base md:text-lg focus:outline-none focus:border-[#0067D1] focus:ring-2 focus:ring-[#0067D1]/20 transition-all hover:border-[#0067D1] shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230067D1\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '24px',
                  paddingRight: '48px',
                  paddingLeft: '28px',
                  color: '#707070'
                }}
                required
              >
                <option value="" style={{ color: '#707070' }}>请选择分区</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} style={{ color: '#000000' }}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '10px' }}>
              <label className="block text-lg md:text-xl font-bold text-black mb-4">
                上传文件
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl text-center transition-all duration-200 ${
                  isDragging
                    ? "border-[#0067D1] bg-blue-50"
                    : "border-slate-300 hover:border-[#0067D1] bg-[#F5F5F5]"
                }`}
                style={{ padding: '8px 32px 8px 32px' }}
              >
                <input
                  type="file"
                  accept=".zip,.rar,.7z,.tar,.gz"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {uploadedFile ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                    style={{ gap: '16px', marginTop: '10px', marginBottom: '10px' }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                      <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-black">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-[#48556a] mt-1">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg active:scale-95"
                    >
                      <X className="w-4 h-4" />
                      移除文件
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center" style={{ gap: '16px', marginTop: '10px', marginBottom: '10px' }}>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                      <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-black mb-2">
                        拖拽文件到此处，或点击上传
                      </p>
                      <p className="text-sm md:text-base text-[#48556a]">
                        支持格式：.zip, .rar, .7z, .tar, .gz
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '10px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={!selectedCategory || !uploadedFile}
                  whileHover={selectedCategory && uploadedFile ? { scale: 1.03, y: -2 } : {}}
                  whileTap={selectedCategory && uploadedFile ? { scale: 0.97 } : {}}
                  className={`relative overflow-hidden rounded-2xl text-lg font-bold transition-all duration-300 ${
                    selectedCategory && uploadedFile
                      ? "text-white shadow-xl"
                      : "bg-slate-200 text-[#A8A8A8] cursor-not-allowed"
                  }`}
                  style={{
                    padding: '16px 64px',
                    background: selectedCategory && uploadedFile
                      ? 'linear-gradient(135deg, #0067D1 0%, #0052a8 100%)'
                      : undefined,
                    boxShadow: selectedCategory && uploadedFile
                      ? '0 8px 24px rgba(0, 103, 209, 0.35)'
                      : undefined
                  }}
                >
                  {selectedCategory && uploadedFile && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0"
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    提交投稿
                  </span>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}