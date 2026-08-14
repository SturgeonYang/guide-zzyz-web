# Git 入门指南

> 面向完全没接触过 Git 的新人。读完这篇文章，你能掌握日常开发 90% 会用到的 Git 操作。
> 建议边读边在终端里把命令敲一遍，光看不练记不住。

## 一、Git 是什么？

Git 是一个**版本控制工具**，可以把它理解成一个带"时光机"的文件夹：

- 每一次修改(提交 commit)都被记录下来，随时可以回退到任意历史版本；
- 多人同时开发时，各自在自己的分支(branch)上工作，互不干扰；
- 大家的代码最终汇合到同一个仓库(repository)，由仓库统一管理。

本项目托管在 GitHub 上，仓库地址：`https://github.com/Guidezzyz/guide-zzyz-web`

## 二、核心概念

先记住下面四个词，后面都会用到：

- **仓库(repository / repo)**：整个项目的所有文件 + 完整修改历史。
- **提交(commit)**：一次修改的"存档"。每次提交都有一个说明(commit message)，用来描述这次改了什么。
- **分支(branch)**：一条独立的开发线。本仓库的分支约定：`main` 是主分支(稳定可发布的版本)，日常开发在 `feature/xxx`、`docs/xxx` 等分支上进行。
- **远程(remote)**：托管在服务器上的仓库副本。本仓库的远程叫 `origin`。

本地文件状态流转：

```
工作区(你正在编辑的文件)
   │  git add
   ▼
暂存区(准备提交的修改)
   │  git commit
   ▼
版本库(已提交的历史记录)
   │  git push
   ▼
远程仓库(GitHub 上的 origin)
```

## 三、安装与首次配置

```bash
# 查看是否已安装
git --version
```

第一次使用前，配置你的名字和邮箱(会记录在每次提交的历史里，让别人知道是谁改的)：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

## 四、获取代码

### 方式一：组织成员，直接克隆

```bash
# SSH 方式(推荐，需在 GitHub 上配置过 SSH key)
git clone git@github.com:Guidezzyz/guide-zzyz-web.git

# 或者 HTTPS 方式(会提示输入账号密码/token)
git clone https://github.com/Guidezzyz/guide-zzyz-web.git
```

### 方式二：非组织成员，先 Fork 再克隆

1. 在 GitHub 网页上打开仓库，点击右上角的 **Fork**，得到一个属于你自己的副本；
2. 克隆你自己名下的仓库：

   ```bash
   git clone git@github.com:<你的用户名>/guide-zzyz-web.git
   ```

3. 把原仓库添加为第二个远程 `upstream`，这样能随时同步原仓库的最新代码：

   ```bash
   git remote add upstream git@github.com:Guidezzyz/guide-zzyz-web.git
   ```

## 五、日常开发流程(核心，必背)

**重点：永远不要在 `main` 分支上直接改代码。** 每次开发都新建一个自己的分支。

```bash
# 1. 先同步最新代码，并切回主分支
git checkout main          # 切换到 main
git pull                   # 拉取远程最新代码

# 2. 新建并切换到自己的开发分支(分支名建议带前缀，如 feature/、docs/)
git switch -c feature/我的功能

# 3. 开始修改代码……

# 4. 查看哪些文件被改了
git status

# 5. 把修改加入暂存区(add 可以接多个文件，或写 . 表示全部)
git add src/pages/Home.tsx
git add .

# 6. 提交，-m 后面写清楚这次改了什么
git commit -m "完成首页轮播图功能"

# 7. 推送分支到远程(第一次推送需要 -u，之后直接 git push 即可)
git push -u origin feature/我的功能
```

推送之后，在 GitHub 网页上打开仓库，会看到提示创建 Pull Request(PR)的按钮，点击即可发起合并请求。**PR 一定要关联对应的 Issue**，具体规范见 [docs/CONTRIBUTION.md](/docs/CONTRIBUTION.md)。

## 六、常用命令速查

- `git status` — 查看当前状态：哪些文件改了、哪些还没提交
- `git add <文件>` / `git add .` — 把修改加入暂存区
- `git commit -m "说明"` — 提交暂存区的修改
- `git log --oneline` — 查看提交历史(一屏一行)
- `git diff` — 查看工作区尚未暂存的改动内容
- `git push` — 把本地提交推送到远程
- `git pull` — 拉取远程最新代码并合并
- `git switch -c <分支名>` — 新建并切换分支
- `git switch <分支名>` / `git checkout <分支名>` — 切换分支
- `git branch` — 查看本地分支(带 `*` 的是当前所在分支)
- `git stash` — 临时保存未提交的修改(先把工作区变干净)
- `git stash pop` — 恢复刚才临时保存的修改
- `git restore <文件>` — 丢弃某个文件工作区的改动(⚠️ 不可恢复，谨慎使用)
- `git remote -v` — 查看远程仓库地址

## 七、同步 Fork 的仓库(非组织成员)

原仓库更新后，同步到你的副本：

```bash
git fetch upstream            # 获取原仓库的最新状态
git switch main
git merge upstream/main       # 把原仓库 main 的更新合并进来
git push origin main          # 更新你 GitHub 上的副本
```

日常开发时也可以直接从 `upstream` 拉取，跳过 `origin`：

```bash
git pull upstream main
```

## 八、撤销与急救

- **提交信息写错了**：`git commit --amend` — 修改最后一次提交(会打开编辑器，也可以写 `--amend -m "新说明"`)。
- **想撤销最后一次提交，但保留修改**：`git reset --soft HEAD~1`。
- **add 加错了文件**：`git restore --staged <文件>` — 把文件从暂存区移出来，改动还在。
- **某个文件改乱了想放弃**：`git restore <文件>` — 恢复到上次提交的状态。
- **代码改到一半要去处理别的事**：`git stash` 存起来，忙完 `git stash pop` 继续。

## 九、遇到冲突怎么办？

pull 或合并时可能提示冲突(conflict)，说明你和别人改了同一个文件的同一处。别慌，按下面的步骤处理：

1. 打开提示冲突的文件，搜索 `<<<<<<<`、`=======`、`>>>>>>>` 标记；
2. 两个标记之间分别是"你的修改"和"对方的修改"，手动决定保留哪些内容；
3. 删除所有冲突标记；
4. `git add <文件>` 然后 `git commit -m "解决冲突"` 完成合并。

如果拿不准怎么取舍，在群里问一下管理员或改动相关代码的人。

## 十、常见问题与注意事项

- **不要把 `node_modules/`、`build/`、`local/` 提交上去** — 项目根目录的 `.gitignore` 已经忽略这些目录；如果你新增了本地敏感/临时文件，记得加到 `.gitignore` 里。
- **提交前先 `git status` 看一眼** — 确认要提交的文件是对的，别把无关改动混进去。
- **commit message 要写清楚** — 中文英文都可以，但要让别人一眼看懂这次改了什么，例如 `完成登录页表单校验`，而不是 `update`。
- **`git pull` 前先处理自己的工作区** — 本地有未提交的修改时先 commit 或 stash，否则可能冲突。
- **只提交需要的文件** — 用 `git add <具体文件>`，少用 `git add .` 以免把临时文件带进去。
- **不要用 `git push -f`(强制推送)** — 会覆盖远程历史，可能导致别人的工作丢失。除非管理员明确要求。

## 十一、完整流程示例：从 Issue 到合并

结合本项目的 [贡献流程](/docs/CONTRIBUTION.md)：

1. 在 Issue 下评论认领任务，等待管理员指派；
2. `git pull` 拉取最新代码；
3. `git switch -c feature/任务分支` 新建分支；
4. 开发并本地验证(`npm run dev`)；
5. `git add` + `git commit -m "..."` + `git push`；
6. 在 GitHub 上发起 PR，关联对应 Issue，并附上修改说明(后端附 API 调用方式、前端附截图)；
7. 等待管理员 review 并合并，合并后把本地分支删掉：`git switch main && git branch -d 分支名`。

## 十二、实在不想用命令行？

- 小改动(如改文档)：直接在 GitHub 网页上编辑文件，选择 *Create a new branch for this commit and start a pull request* 即可。
- 想用图形界面：GitHub 官方有 [GitHub Desktop](https://desktop.github.com/)，支持常见的提交、推送、合并操作。
- 命令行依然是日常开发的主流方式，建议至少把第五节和第六节的内容学会。
