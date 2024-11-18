---
title: 重学 React 02
published_at: 2024-11-14T15:00:00.000Z
snippet: Relearning React from react.dev
---

## 从"使用 JSX 编写标记"说起
### 为什么我们使用 JSX？
JSX 是 JavaScript 的语法扩展。它是为了配合 React 而编写的。JSX 代码看起来很像 HTML。JSX 是 JavaScript 的语法扩展。它是为了配合 React 而编写的。JSX 代码看起来很像 HTML。
> JSX 和 React 是两个独立的东西。它们经常一起使用，但你可以独立使用它们。JSX 是一个语法扩展，而 React 是一个 JavaScript 库。

### JSX 的规则
- 返回单个元素
- 闭合所有标签，即使是自闭合标签
- 使用驼峰命名法命名 HTML 属性

错误信息通常会为你指出修复标记的正确方向。

### 将现有 HTML 转换为 JSX
使用 [Convert HTML to JSX](https://transform.tools/html-to-jsx) 将 HTML 转换为 JSX。

## 从"JSX 中的 JavaScript 语法"说起
- 使用 `{}` 在 JSX 中嵌入 JavaScript 表达式
- 使用 "" 或 '' 在 JSX 中嵌入字符串字面量
- 使用 `{{}}` 在 JSX 中嵌入对象字面量或传递样式对象到组件的 style 属性

## 从"向组件传递 Props"说起
- 使用解构赋值来提取 props（如果 props 容易提取），你也可以使用解构来为 props 指定默认值
- 使用展开运算符来传递 props 给组件。*请谨慎使用展开语法，因为它可能使你的代码更难理解。*

```jsx
// const props = { name: "John", age: 42, img: "url", alt: "profile" };
// <Profile {...props} />;
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

## 常见陷阱
### 是否有任何非驼峰命名的属性？
由于历史原因，`aria-*` 和 `data-*` 属性按照 HTML 的方式用短横线书写。例如，`aria-label`，`data-id`。

### 内联样式
内联样式属性使用驼峰命名法书写。例如，HTML 中的 `<ul style="background-color: black">` 在你的组件中要写成 `<ul style={{ backgroundColor: 'black' }}>`。

## 深入探讨
### 为什么多个 JSX 标签需要被包裹？
因为虽然 JSX 看起来像 HTML，但它最终会被转换成普通的 JavaScript 对象。所以我们需要将多个 JSX 标签包裹在一个父元素中，或者我们可以使用 Fragment 来包裹它们。

## 参考资料
- [React JSX 的所有组件](https://react.dev/reference/react-dom/components/common)
