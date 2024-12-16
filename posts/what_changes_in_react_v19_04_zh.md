---
title: React 19 有哪些变化 - 4
published_at: 2024-12-12T15:00:00.000Z
snippet: React V19 change log 解读.
---

这篇文章在第二部分介绍了一些对之前特性的升级.

## 与第三方脚本和扩展的兼容性

React 19 改进了 Hydration，能够更好地处理第三方脚本和浏览器扩展引起的问题。

### 特性：

- 当 Hydration 过程中，客户端渲染的元素与服务器 HTML 不匹配时，React 会强制客户端重新渲染修复内容。
- 如果 `<head>` 和 `<body>` 中存在意外的第三方标签，React 会跳过这些标签以避免不必要的错误。
- 如果发生非相关的 Hydration 错误导致整个文档需要重新渲染，React 会保留由第三方脚本或扩展插入的样式表。

---

## 更好的错误报告

React 19 改进了错误处理，减少了重复错误日志，并为捕获和未捕获的错误提供了更多选项：

### 示例：

以前：

```console
Uncaught Error: hit
  at Throws
  at renderWithHooks
  …
Uncaught Error: hit    <-- Duplicate
  at Throws
  at renderWithHooks
  …
```

现在：

```console
Error: hit
  at Throws
  at renderWithHooks
  …

React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
```

### 新增选项：

- `onCaughtError`：当 React 在 Error Boundary 中捕获错误时调用。
- `onUncaughtError`：当错误未被 Error Boundary 捕获时调用。
- `onRecoverableError`：当错误被自动恢复时调用。

更多信息请参阅 `createRoot` 和 `hydrateRoot` 的文档。

---

## 自定义元素支持

React 19 对自定义元素提供了全面支持，并通过了 Custom Elements Everywhere 的所有测试。

### 特性：

- **服务器渲染**：
  - 如果 `props` 是字符串、数字或 `true` 等原始值，会作为属性渲染。
  - 如果是对象、函数、符号或 `false`，则会被忽略。
- **客户端渲染**：
  - 匹配自定义元素实例属性的 `props` 将作为属性分配。
  - 其他 `props` 会作为 HTML 属性分配。
