# WHO CNS5 知识库与独立博客交接文档 (HANDOFF.md)

## 1. 项目全貌与工作区概况

本项目由两部分紧密协同的子系统组成：
1. **Obsidian 知识库 (`/Users/andi/Documents/mri-wiki-cn`)**：基于 Karpathy llm-wiki 架构，涵盖 220+ 篇神经肿瘤实体、比较、综述与原始资料库。
2. **独立 Astro 7 分类博客 (`/Users/andi/Documents/who-cns5-blog`)**：面向公众与临床医生的 WHO CNS5 中英文双语分类速查与 AI 辅助交互站点。

---

## 2. 核心技术栈与配置

### 2.1 Astro 7 独立博客 (`who-cns5-blog`)
- **框架版本**：`astro@^7.2.8`（SSG 预渲染 + 按需 SSR 混合模式）。
- **运行环境**：Node `>= 22.12.0`。
- **核心依赖**：
  - `openai@^7.7.0`：驱动流式 AI 对话后端。
  - `marked@^18.0.11` + `marked-katex-extension@^5.1.12` + `katex@^0.18.4`：前端 Markdown 与数学公式渲染。
  - `dompurify@^3.4.14`：客户端防 XSS 注入净化。
- **适配器与服务**：
  - 本地/VPS 模式：`@astrojs/node` (`mode: "standalone"`)。
  - Netlify 模式：需安装使用 `@astrojs/netlify`。
- **环境配置 (`.env`)**：
  ```env
  OPENAI_API_KEY=sk-bAOFkz9sxZp5Di0CXrLW7u2GWbUljAkmlYVvMqae4O3aXggN
  OPENAI_BASE_URL=https://apihub.agnes-ai.com/v1
  OPENAI_MODEL=agnes-2.5-flash
  ```

---

## 3. 关键资产与数据结构

### 3.1 词条数据中心 (`src/data/terms.ts`)
- 共包含 **83 个分类实体词条**。
- 数据结构规范（TypeScript `Term` 接口）：
  - `slug`: URL 路由标识符（英文 kebab-case）。
  - `en` / `zh`: 英文标准全称与权威中文译名（校准自《放射学实践》2021）。
  - `level`: `"family"` | `"group"` | `"type"`。
  - `parent`: 父级 slug（建立分类溯源）。
  - `grades`: CNS WHO 分级（例如 `"CNS WHO 1–4"`）。
  - `summary`: 一句话诊断核心与特征。
  - `sections`: 结构化要点、MRI 信号特征、鉴别诊断表（含表格 `table` 与列表 `body`）。
  - `related`: 关联词条图谱（用于底部知识卡片联动）。

### 3.2 页面与组件结构
- `src/pages/index.astro`：
  - 11 大家族可折叠卡片层级树。
  - **83 处子项与亚型全部挂接 `/types/<slug>/` 超链接**。
  - 底部标注「认知凤凰社」出品。
- `src/pages/types/[slug].astro`：
  - 动态路由生成的 83 个词条静态详情页。
  - 包含面包屑、WHO 分级徽标、诊断要点、结构化对比表、关联图谱。
- `src/pages/types/index.astro`：
  - 词条总览与客户端全字段实时搜索（Cmd/Ctrl+K 触发）。
- `src/components/AiSidebar.astro`：
  - 悬浮展开式 AI 助手面板，支持上下文感知注入（自动获取当前正在浏览的词条上下文），SSE 实时打字流，Markdown + LaTeX 公式即时渲染。
- `src/pages/api/chat.ts`：
  - 服务端 SSR 路由（`export const prerender = false`），安全持有 API Key，过滤模型推理 Token 并输出纯净 Markdown 流。

---

## 4. 规范与命名基准（权威依据）

项目全量校准依据为《放射学实践》2021 年第 36 卷第 10 期《2021 年第 5 版 WHO 中枢神经系统肿瘤分类解读》：
- **四级报告层级**：综合诊断（integrated diagnosis）-> 组织学分类 -> CNS WHO 分级 -> 分子信息。
- **命名关键校准点**：
  - 局限性星形细胞胶质瘤（非“局限性星形细胞瘤”）。
  - 1p/19q 联合缺失（非“共缺失”）。
  - WNT / SHH 活化型（非“激活型”）。
  - 神经鞘瘤（非“听神经瘤”）。
  - 鞍区肿瘤（非“下丘脑和垂体区肿瘤”）。
  - 间叶性非脑膜上皮来源肿瘤（非“间叶非脑膜瘤”）。

---

## 5. 运维、验证与部署指南

### 5.1 本地开发与构建
```bash
cd /Users/andi/Documents/who-cns5-blog
pnpm install          # 安装依赖
pnpm run build        # 生产构建（83 个页面预渲染）
pnpm run preview      # 启动本地 4321 预览端口
```

### 5.2 部署到 Netlify 检查清单
1. **安装 Netlify 适配器**：`pnpm add @astrojs/netlify`
2. **切换配置**：将 `astro.config.mjs` 中的 `node({ mode: "standalone" })` 改为 `netlify()`。
3. **设置环境变量**：在 Netlify 控制台录入 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_MODEL` 和 `NODE_VERSION=22`。
4. **构建命令**：`pnpm run build`，发布目录填 `dist`。

---

## 6. 后续待办与扩展建议 (Next Steps)
1. **图文关联增强**：在 `terms.ts` 的 `sections` 中补充典型 MRI 影像示例示意图。
2. **Obsidian 联动自动化**：编写脚本支持从 `wiki/entities/*.md` 批量更新/校验 `src/data/terms.ts`。
3. **AI 对话多轮持久化**：目前 AI 侧边栏为单页面会话，可在前端 LocalStorage 中保留最近对话记录。
