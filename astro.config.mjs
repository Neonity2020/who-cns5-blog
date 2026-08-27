// @ts-check
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://who-cns5-cn.netlify.app",
  // 静态站 + Netlify 适配器：页面预渲染，/api/* 按需服务端渲染（AI 代理）
  output: "static",
  adapter: netlify(),
});
