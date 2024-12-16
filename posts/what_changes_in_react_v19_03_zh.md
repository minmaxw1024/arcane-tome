---
title: React 19 有哪些变化 - 3
published_at: 2024-12-11T15:00:00.000Z
snippet: React V19 change log 解读.
---

这篇文章在第二部分介绍了一些对之前特性的升级.

## 文档元数据支持

在 HTML 中，像 `<title>`、`<link>` 和 `<meta>` 等文档元数据标签通常需要放在 `<head>` 部分。React 过去需要通过副作用或库（如 react-helmet）手动插入这些标签，并在服务器渲染时需要谨慎处理。

在 React 19 中，这些元数据标签现在可以直接在组件中渲染，并自动提升到文档的 `<head>` 部分：

```javascript
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>E=mc²...</p>
    </article>
  );
}
```

### 改进点：

- 标签如 `<title>`、`<link>` 和 `<meta>` 将自动提升到 `<head>`。
- 支持客户端应用、流式服务器渲染（SSR）和服务器组件。

**注意**：复杂的元数据需求仍可使用专用库（如 react-helmet）。

更多信息请参阅 `<title>`、`<link>` 和 `<meta>` 的文档。

---

## 样式表支持

React 19 对样式表支持进行了增强，使样式表与组件的依赖关系更紧密，并优化了客户端和服务器渲染中的样式加载：

### 特性：

- 使用 `precedence` 属性指定样式表的优先级，React 将根据优先级管理样式表插入顺序。
- 服务器渲染中，React 会确保样式表在 `<head>` 中并在内容呈现前加载。
- 客户端渲染中，React 将等待样式表加载完成后再提交渲染。
- 重复引用的样式表不会被多次插入。

示例：

```javascript
function ComponentOne() {
  return (
    <Suspense fallback="loading...">
      <link rel="stylesheet" href="foo" precedence="default" />
      <link rel="stylesheet" href="bar" precedence="high" />
      <article class="foo-class bar-class">...</article>
    </Suspense>
  );
}

function ComponentTwo() {
  return (
    <div>
      <p>...</p>
      <link rel="stylesheet" href="baz" precedence="default" />
    </div>
  );
}
```

更多信息请参阅 `<link>` 和 `<style>` 的文档。

---

## 异步脚本支持

React 19 增强了对异步脚本的支持，可以在组件树中任何位置渲染异步脚本，而无需手动管理脚本的位置和去重。

示例：

```javascript
function MyComponent() {
  return (
    <div>
      <script async={true} src="..." />
      Hello World
    </div>
  );
}

function App() {
  return (
    <html>
      <body>
        <MyComponent />
        <MyComponent /> {/* 不会重复加载脚本 */}
      </body>
    </html>
  );
}
```

### 特性：

- 异步脚本在所有渲染环境中都会被去重，只加载一次。
- 服务器渲染中，异步脚本将被包含在 `<head>` 中并优先于非关键资源。

更多信息请参阅 `<script>` 的文档。

---

## 资源预加载支持

React 19 提供了一组新 API 来优化资源加载，通过更早告知浏览器需要加载的资源来提升性能。

### 示例：

```javascript
import { prefetchDNS, preconnect, preload, preinit } from "react-dom";

function MyComponent() {
  preinit("https://.../path/to/some/script.js", { as: "script" }); // 提前加载并执行脚本
  preload("https://.../path/to/font.woff", { as: "font" }); // 预加载字体
  preload("https://.../path/to/stylesheet.css", { as: "style" }); // 预加载样式表
  prefetchDNS("https://..."); // 提前解析 DNS
  preconnect("https://..."); // 提前建立连接
}
```

上述代码将生成以下 HTML：

```html
<html>
  <head>
    <link rel="prefetch-dns" href="https://..." />
    <link rel="preconnect" href="https://..." />
    <link rel="preload" as="font" href="https://.../path/to/font.woff" />
    <link rel="preload" as="style" href="https://.../path/to/stylesheet.css" />
    <script async="" src="https://.../path/to/some/script.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

### 特性：

- 优化初始页面加载，通过更早发现资源提升性能。
- 支持客户端更新，通过预加载提升导航速度。

更多信息请参阅资源预加载 API 的文档。
