# MOD520 · MOD 制作教程

把分散在各处的中文 MOD 制作知识，整理成一条看得懂、走得通的路。

覆盖：魂系（法环/只狼/黑魂）· UE 引擎 · 卡普空系（RE 引擎 / MT Framework），工具链含 3dmigoto。

纯 HTML / CSS / JS 构建，托管于 GitHub Pages。

## 访问

站点地址：`https://honxi1.github.io/MOD520/`（自定义域名 `mod520.com`）

## 页面

| 页面 | 说明 | 文件 |
| --- | --- | --- |
| 首页 | 站点入口与制作链路总览 | `index.html` |
| 愿景与规划 | 站点愿景、路线图、共建方式 | `tutorials/pipeline.html` |

## 本地预览

直接用浏览器打开 `index.html`，或启动任意静态服务器：

```bash
python -m http.server 8000
```

## 如何新增内容

1. 在 `tutorials/` 下新建页面，复制 `pipeline.html` 的骨架（顶栏、侧边栏、页脚）。
2. 在 `index.html` 的卡片区和侧边栏中登记新页面。
3. 保证相对路径正确（`../assets/`）。

## 部署

站点从 `gh-pages` 分支发布（分支部署，根目录）。改动推送到 `gh-pages` 后自动上线；`main` 分支保留开发中的源文件。

```bash
git push origin gh-pages
```

自定义域名 `mod520.com` 通过仓库根目录的 `CNAME` 文件绑定。