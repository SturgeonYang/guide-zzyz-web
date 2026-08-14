# CONTRIBUTION

## 贡献流程

我们采用 **Issue** 的开发责任明确的贡献方式
如果您希望贡献, 请打开项目的 Issue 并挑选您适合的任务(根据个人的时间精力以及能力来选择)
在 Issue 的下方评论, 如果管理员觉得这个任务适合你来做, 就会将任务指派给您

- 打开Issue 并寻找适合您的任务
- 在 Issue 下评论，如果可以的话，给出具体需要的开发时间(或者资源)
- 如果管理员觉得你能够胜任这个 Issue, 会将这个 内容指派给你
- 之后您便可以进行开发

**如果您自己做了不在Issue当中的任务,我们大概率不会合并您的代码,应为不在Issue当中的任务我们已经有成员在推进**

如果您不是组织内的成员, 请您 fork 仓库进行开发, 之后提出PR

## PR 规范

提交 PR 的时候, 必须关联某个 Issue 并说明新增的代码内容

并按照如下的规范提出 PR

- 如果是后端的代码, 说明**附上API的调用方式**, 以及**运行方式** (如果按照开发文档开发的直接粘贴即可)
- 如果是前端的代码, 需要**截图修改之后的区域** (如果修改的地方很多不方便截图, 可以直接通知管理员)
- 如果是**文档则不需要附加**, 管理员会直接查看修改的文件内容

我们在确认您的代码有效且合理之后， 会尽快将您的代码合并

---

## 项目介绍

`guide-zzyz-web` 是一个基于 React 的前端项目，面向 zzyz 的学生提供学习、大学与生活方面的信息和建议。项目通过标签化的文档收录与呈现内容，页面内容主要由静态 Markdown 文档驱动。

### 一、 技术栈与开发命令

- **构建工具**: Vite 6(插件: @vitejs/plugin-react-swc)
- **前端框架**: React 19 + react-router v7
- **样式方案**: Tailwind CSS v4 + shadcn/ui(基于 Radix UI 的通用组件，位于 `src/components/ui/`)
- **其他主要依赖**: motion(动画)、react-markdown(Markdown 渲染)、lucide-react(图标)
- **常用命令**: `npm run dev` 本地开发(默认端口 3000)、`npm run build` 打包到 `build/`

### 二、 根目录结构

- **`src/`** — 前端源码。页面、组件、路由、状态管理与工具函数均在此目录。
- **`public/`** — 静态资源目录，构建时原样拷贝。存放帖子 Markdown、评论 JSON 与字体文件。
- **`server/`** — Express + PostgreSQL 后端(认证、投稿等 API 的实现)。当前阶段不采用，仅作参考。
- **`docs/`** — 项目文档：`CONTRIBUTION.md`(本文件)、`HELP.md`、`PLAN.md`、`TODO.md` 以及 `utils/` 下的辅助说明。
- **`local/`** — 本地文档与提案 也可以放自己的测试代码(已被 `.gitignore` 忽略，不参与版本控制)。
- **`pending/`** — 待处理的文档(如 `design.md`)。
- **根目录配置文件**:
  - `package.json` (依赖与脚本)
  - `vite.config.ts`(构建与开发服务器配置)
  - `tsconfig.json` / `tsconfig.node.json`(TypeScript 配置)
  - `index.html`(HTML 入口)
  - `.gitignore` (git 忽略的内容)
  - `README.md`(项目说明)。
- **自动生成内容**: `node_modules/`(依赖)、`package-lock.json`(依赖锁文件)、`build/`(打包产物)。

### 三、 `src/` 源码结构

**入口与路由**

- `src/main.tsx` — 应用入口，将 `App` 挂载到 `#root`。
- `src/App.tsx` — 根组件，包裹 `AuthProvider` 与 `RouterProvider`。
- `src/Root.tsx` — 全局布局(导航栏 + 页面出口 + 页脚)。
- `src/routes.ts` — 路由配置：`/`(首页)、`/submit`(投稿)、`/profile`(个人资料)、`/join-us`(加入我们)、`/community`(论坛，含帖子列表与详情 `/community/:slug`)。

**页面(`src/pages/`)**

- `Home.tsx` — 首页。
- `Community.tsx` — 论坛页面布局。
- `Submit.tsx` — 投稿页。
- `Profile.tsx` — 个人资料页。
- `JoinUs.tsx` — 加入我们页。

**社区模块(`src/community/`)**

- `posts/PostList.tsx` — 帖子列表，读取 `public/posts/posts.json`。
- `posts/PostDetail.tsx` — 帖子详情，拉取对应的 Markdown 文件并渲染。
- `comments/CommentBox.tsx` — 评论组件，与本地评论服务交互。
- `comments/server.ts` — 本地评论服务(Express，端口 3001)，以 JSON 文件形式读写 `public/comments/`。

**通用组件(`src/components/`)**

- `Navbar.tsx`、`Footer.tsx` — 全局导航栏与页脚。
- `AuthModal.tsx` — 登录/注册弹窗。
- `ui/` — shadcn/ui 生成的通用 UI 组件(Button、Dialog、Card 等)，不含业务逻辑。

**状态、数据与类型**

- `context/AuthContext.tsx` — 登录状态管理，提供登录、注册、退出、资料更新等能力。
- `lib/api.ts` — HTTP 通信封装(`/api` 下的注册、登录、用户信息与投稿接口)，并负责 token 的存取。
- `lib/storage.ts` — 基于 localStorage 的旧数据层，已被 `api.ts` 取代，保留用于兼容。
- `types/auth.ts` — `User`、`Post`、`AuthContextType` 等类型定义。

**资源与样式**

- `assets/` — 图片资源，按用途组织(`home/`、`nav/`、`team/`)。
- `index.css` / `styles/globals.css` — 全局样式与字体声明。

### 四、 `public/` 静态资源

- `posts/` — 帖子内容：`posts.json` 为帖子列表索引，`post1.md` ~ `post5.md` 为 Markdown 正文(带 YAML front matter)。
- `comments/` — 评论数据(JSON 文件，由本地评论服务读写)。
- `fonts/` — 字体文件(如 `PianPian.otf`)。

### 五、 内容与数据流向

- 帖子列表与正文存放在 `public/posts/`，前端通过 fetch 直接读取，无需后端参与。
- 评论功能依赖 `src/community/comments/server.ts` 提供的本地服务(端口 3001)，评论以 JSON 形式持久化到 `public/comments/`。
- 用户注册、登录、资料与投稿相关的前端调用位于 `src/lib/api.ts`，其接口实现对应 `server/` 目录(当前阶段不采用)。
