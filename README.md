# MOD520 · MOD 开发教程

从零开始的 MOD 开发教程站点，使用纯 HTML / CSS / JS 构建，托管于 GitHub Pages。

## 访问

站点地址：`https://honxi1.github.io/MOD520/`

## 教程章节

| 章节 | 主题 | 文件 |
| --- | --- | --- |
| 第 1 章 | 环境搭建 | `tutorials/chapter-1-environment.html` |
| 第 2 章 | 第一个 MOD | `tutorials/chapter-2-first-mod.html` |
| 第 3 章 | 数据与资源 | `tutorials/chapter-3-data-assets.html` |
| 第 4 章 | 进阶功能 | `tutorials/chapter-4-advanced.html` |
| 第 5 章 | 打包与发布 | `tutorials/chapter-5-packaging.html` |

## 本地预览

直接用浏览器打开 `index.html`，或启动任意静态服务器：

```bash
python -m http.server 8000
```

## 如何贡献

新增章节时：

1. 在 `tutorials/` 下新建 `chapter-N-xxx.html`，复制已有章节的骨架（顶栏、侧边栏、页脚）。
2. 在 `index.html` 的卡片区和所有章节的侧边栏中登记新章节。
3. 保证相对路径正确（`../assets/`）。

## 部署

推送到 `main` 分支即可，GitHub Pages 从分支根目录发布（需在仓库 Settings → Pages 中开启）。