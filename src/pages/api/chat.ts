import type { APIRoute } from "astro";
import OpenAI from "openai";
import { terms } from "../../data/terms";

// 本路由按需服务端渲染（其余页面均预渲染）
export const prerender = false;

const apiKey: string | undefined =
  import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY || undefined;
const baseURL: string | undefined =
  import.meta.env.OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || undefined;
const model: string =
  import.meta.env.OPENAI_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini";

// 密钥留在服务端；未配置时前端进入演示模式
const client = apiKey ? new OpenAI({ apiKey, baseURL }) : null;

const siteMap = terms
  .map((t) => `- ${t.en}（${t.zh}）→ /types/${t.slug}/`)
  .join("\n");

function buildContext(slug?: string): string {
  const term = terms.find((t) => t.slug === slug);
  if (!term) {
    return `用户正在浏览「WHO CNS5 分类速览」博客（无具体词条页）。\n\n站点词条目录：\n${siteMap}`;
  }
  const sections = term.sections
    .map((s) => {
      let out = `【${s.heading}】`;
      if (s.body) out += "\n" + s.body.join("\n");
      if (s.table)
        out +=
          "\n" +
          s.table.head.join(" | ") +
          "\n" +
          s.table.rows.map((r) => r.join(" | ")).join("\n");
      return out;
    })
    .join("\n\n");
  const related = term.related.map((r) => r.label).join("、");
  return `用户当前浏览词条：${term.en}（${term.zh}）｜分级：${term.grades ?? "—"}\n简介：${term.summary}\n相关词条：${related || "无"}\n\n词条资料：\n${sections}\n\n站点词条目录：\n${siteMap}`;
}

function sse(encoder: TextEncoder, event: string, data: string): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export const POST: APIRoute = async ({ request }) => {
  let body: { slug?: string; messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .slice(-10)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, 4000),
    }));
  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "缺少用户消息" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const system = [
    "你是「认知凤凰社 · 影像知识笔记」WHO CNS5 分类博客的 AI 助手。",
    "用简体中文回答；优先依据下方站点词条资料，简明、准确。",
    "回复支持完整 Markdown（标题、列表、表格、代码块）与 KaTeX 数学公式：行内公式用 $...$，独立公式用 $$...$$。",
    "资料未覆盖的问题请如实说明，并建议查阅 Radiopaedia 或 WHO 原文。",
    "不编造分类学细节；涉及临床决策时末尾附一句「仅供学习参考，不构成诊疗建议」。",
    "",
    buildContext(body.slug),
  ].join("\n");

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: string) =>
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      try {
        if (!client) {
          const demo = [
            "**【演示模式】**尚未配置 `OPENAI_API_KEY`，这是一条本地演示回复。",
            "",
            "启用真实 AI 对话：",
            "1. 编辑项目根目录 `.env`，填入 `OPENAI_API_KEY`；",
            "2. 如使用兼容网关（one-api / 9router 等），同时填 `OPENAI_BASE_URL`，可用 `OPENAI_MODEL` 指定模型；",
            "3. 重启服务（`npm run dev` 或重新 build + preview）。",
            "",
            "当前已就绪的能力：当前词条上下文自动注入、多轮对话、SSE 流式输出、Ctrl/⌘+K 快捷键。",
          ].join("\n");
          for (const line of demo.split("\n")) {
            send("delta", line + "\n");
            await new Promise((r) => setTimeout(r, 40));
          }
          send("done", "[DONE]");
          return;
        }
        const completion = await client.chat.completions.create({
          model,
          stream: true,
          temperature: 0.4,
          messages: [{ role: "system", content: system }, ...history],
        });
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) send("delta", delta);
        }
        send("done", "[DONE]");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        send("error", "模型调用失败：" + msg);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
