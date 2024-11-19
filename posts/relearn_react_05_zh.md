---
title: 重新学习 React 05
published_at: 2024-11-18T15:00:00.000Z
snippet: Relearning React from react.dev
---

## 响应事件

在 React 开发中，处理事件、管理状态和更新 UI 是最常见的任务。

由于在 JavaScript 中函数是一等公民，我们可以将事件处理函数作为 props 传递给组件。这是 UI 框架中一个非常常见的使用模式。

## 常见陷阱

### 传递给事件处理器的函数

`<button onClick={handleClick}>` 与 `<button onClick={handleClick()}>`

- 第一种方式将函数传递给事件处理器。
- 第二种方式调用函数并将结果传递给事件处理器。
  _这个函数将在组件每次渲染时执行。_ 这不是你想要的结果。

我们可以使用箭头函数来避免这个陷阱：

```jsx
<button onClick={() => handleClick()}>点击我</button>;
```

### 事件传播

在 React 中，除了 `onScroll` 只在附加它的 JSX 标签上工作外，所有事件都会传播。

我们可以使用 `e.stopPropagation()` 来阻止事件传播。

### 阻止默认行为

我们可以使用 `e.preventDefault()` 来阻止事件的默认行为。

## 深入理解

### 捕获阶段事件

事件传播有三个阶段：

- 捕获阶段：从 window 到目标元素，自上而下
- 目标阶段：到达目标元素
- 冒泡阶段：从目标元素到 window，自下而上

```txt
捕获阶段（从顶部到目标）      |   冒泡阶段（从目标到顶部）
----------------------------------|-----------------------------------
window → document → html → body → div → button
                                 ↳ button → div → body → html → document → window
```

## 参考资料

- [箭头函数](https://javascript.info/arrow-functions-basics)