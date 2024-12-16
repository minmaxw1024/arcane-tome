---
title: React 19 有哪些变化 - 2
published_at: 2024-12-10T15:00:00.000Z
snippet: React V19 change log 解读.
---

这篇文章在第二部分介绍了一些对之前特性的升级.

# React 19 新特性更新

## ref 作为 props 使用

在 React 19 中，函数组件可以直接将 `ref` 作为 `props` 访问，无需使用 `forwardRef`：

```javascript
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

// 使用方式
<MyInput ref={ref} />;
```

### 改进点：

- 新的函数组件无需再使用 `forwardRef`。
- React 将发布一个代码迁移工具（codemod）来自动更新现有代码。
- 在未来版本中，`forwardRef` 将会被废弃。

**注意**：
传递给类组件的 `ref` 不会作为 `props` 传递，因为它们引用的是组件实例。

---

## 改进的 Hydration 错误报告

React 19 改进了在 `react-dom` 中的 hydration 错误报告。

### 旧错误日志：

在开发模式下，错误信息通常分散且缺乏具体上下文：

```console
Warning: Text content did not match. Server: “Server” Client: “Client”
...
```

### 新错误日志：

现在，React 会输出一条包含详细差异的错误信息：

```console
Uncaught Error: Hydration failed because the server rendered HTML didn’t match the client...
<App>
  <span>
+    Client
-    Server
```

### 可能的原因：

- 使用了客户端/服务器分支代码（如 `typeof window !== 'undefined'`）。
- 变量输入（如 `Date.now()` 或 `Math.random()`）。
- 本地化的日期格式化不一致。
- 没有同步 HTML 数据快照。
- 无效的 HTML 标签嵌套。
- 浏览器扩展导致的 HTML 修改。

更多信息请参阅 [hydration-mismatch 文档](https://react.dev/link/hydration-mismatch)。

---

## <Context> 作为 Provider 使用

在 React 19 中，可以直接使用 `<Context>` 渲染 Context 提供者，而不再需要 `<Context.Provider>`：

```javascript
const ThemeContext = createContext("");

function App({ children }) {
  return <ThemeContext value="dark">{children}</ThemeContext>;
}
```

### 改进点：

- `<Context>` 可以直接作为提供者。
- 将发布迁移工具以转换现有 `<Context.Provider>` 实现。
- 在未来版本中，`<Context.Provider>` 将被废弃。

---

## refs 的清理函数

React 19 支持在 `ref` 回调中返回清理函数，用于在元素从 DOM 中移除时重置 `ref`：

```javascript
<input
  ref={(ref) => {
    // 创建 ref
    return () => {
      // 清理 ref
    };
  }}
/>
```

### 改进点：

- 清理函数适用于 DOM refs、类组件 refs 以及 `useImperativeHandle`。
- React 不再在卸载组件时调用带 `null` 的 ref 函数。

**注意**：由于清理函数的引入，TypeScript 现在会拒绝从 ref 回调中返回非清理函数的值。

修复示例：

```diff
- <div ref={(current) => (instance = current)} />
+ <div ref={(current) => { instance = current; }} />
```

可使用 `no-implicit-ref-callback-return` 的迁移工具修复该模式。

---

## `useDeferredValue` 初始值

React 19 为 `useDeferredValue` 添加了 `initialValue` 选项：

```javascript
function Search({ deferredValue }) {
  const value = useDeferredValue(deferredValue, ""); // 初始值为 ''
  return <Results query={value} />;
}
```

### 特性：

- 初次渲染时返回 `initialValue`，然后在后台重新渲染并使用 `deferredValue`。

更多信息请参阅 [useDeferredValue 文档](https://react.dev/link/useDeferredValue)。
