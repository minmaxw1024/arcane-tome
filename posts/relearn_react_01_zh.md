---
title: 重新学习 React 01
published_at: 2024-11-04T15:00:00.000Z
snippet: Relearning React from react.dev
---

我正在通过[react.dev](https://react.dev)重新学习 React。这个官方文档是学习 React
的一个极好的资源。

在过去的五年里，我一直在使用 React，从基于类的组件到使用 hooks 的函数组件，从
JavaScript 到
TypeScript。最近，我发现这个官方文档非常好，甚至我还能从中学到很多。它包含了许多最佳实践的参考，也包含了很多我之前不知道的坑点和深入主题。我可以说这是我的一个隐藏宝藏。

我会在这里记录我的学习笔记，与您分享，希望您也能从文档中学到一些东西。

## 从“你的第一个组件”

文档的第一个部分是“你的第一个组件”。这是对 React 的一个简单介绍。

### 现代 JavaScript 和 Node.js 中的 export

在我过去的项目中，我默认使用 ESM 作为模块系统，因为像 Webpack、Babel 和 Vite
等一些 JavaScript 工具默认支持 ESM。但是在我的 Node.js 项目中，我仍然使用
CommonJS，因为它是 Node.js 的默认模块系统。最近，Node.js 也支持 ESM
了。而且一些新的 JavaScript 工具，如 Deno 和 Bun 默认也使用 ESM
作为模块系统。所以我认为是时候在我的 Node.js 项目中切换到 ESM 了。

## 导入和导出组件

这一部分介绍了如何在 React 中导入和导出组件。我认为作者是想让我们了解：

- React 应用程序由组件组成。
- 组件是可重用的，并且可以嵌套在其他组件中。
- 组件可以导入和导出。
- 组件可以在同一文件中定义，也可以在不同文件中定义。

### 为什么要分离组件？

> 这让你的文件易于扫描，并且可以在更多的地方重用组件。

## 坑点

### React 组件和函数

> React 组件是普通的 JavaScript
> 函数，但它们的名称必须以大写字母开头，否则将无法正常工作！

这是 React 中的一个常识。

### JavaScript 中的括号

> 如果没有括号，`return` 后面的任何代码都将被忽略！

也许这是 JavaScript 中的一个常见坑？

```javascript
function getObject() {
  return
  {
    key: "value";
  }
}
```

上面的代码将返回 `undefined`，因为 JavaScript 引擎会在 `return` 后插入一个分号，因此 `return` 后的代码将被忽略。

```javascript
function getObject() {
  return; // <- JavaScript 会在这里插入一个分号
  {
    key: "value";
  }
}
````

### 嵌套组件

> 组件可以渲染其他组件，但绝不能嵌套定义它们：
>
> ```javascript
> export default function Gallery() {
>     // 🔴 永远不要在一个组件内定义另一个组件！
>     function Profile() {
>         // ...
>     }
>     // ...
> }
>
> export default function Gallery() {
>     // ...
> }
>
> // ✅ 在顶层声明组件
> function Profile() {
>     // ...
> }
> ```
>
> 当子组件需要从父组件获取一些数据时，通过 props 传递而不是嵌套定义。

## 深入探讨

### 组件的层层嵌套

React 应用程序本质上是一个组件树。每个组件都是一个组件的树。这是 React
中一个非常重要的概念。在树中有一个根组件，它是应用程序的入口点，比如 Next.js
中的 `pages/index.js`。

一些网站只在页面的一小部分使用
React，比如评论表单或搜索栏。在这种情况下，你可以在非 React 网站中使用 React
组件。你可以使用 `ReactDOM.render()` 在非 React 网站中渲染一个 React 组件。

### 默认导出与命名导出

初始化一个 Markdown 表格

| 语法     | 导出语句                                   | 导入语句                                       |
| -------- | ------------------------------------------ | ---------------------------------------------- |
| 默认导出 | `export default function MyComponent() {}` | `import MyComponent from './MyComponent';`     |
| 命名导出 | `export function MyComponent() {}`         | `import { MyComponent as ThatComponent } from './MyComponent';` |

我们可以在导入时直接重命名默认导出，给它分配任意名称。而对于命名导出，我们可以使用
`as` 关键字重命名它们。
