---
title: 重新学习 React 07
published_at: 2024-11-20T15:00:00.000Z
snippet: 从 react.dev 重新学习 React
---

## 来自 "State 作为一个快照"

State 虽然定义在组件内部，但是由 React 在组件外部管理。React
会跟踪每个组件的状态，当状态发生变化时，React 会重新渲染该组件。

### 当状态改变时会发生什么？

当组件的状态发生变化时，React 会重新渲染该组件。

1. React 再次调用你的函数。
2. 你的函数返回一个新的 JSX 快照。
3. React 然后更新屏幕（DOM）以匹配你的函数返回的快照。

### 快照包含什么？

一个组件的"快照"包括以下内容：

- props（属性）
- 事件处理器
- 局部变量

这意味着，每次渲染都有其自己的 props、事件处理器和局部变量。

这就是为什么在下面的例子中，alert 数字是
0，因为这个事件处理器捕获了点击事件时的状态数字。反过来说，这意味着每次渲染都有其自己的事件处理器、props
和状态。

```jsx
# 状态数字是 0

<button onClick={() => {
  setNumber(number + 5);
  setTimeout(() => {
    alert(number);
  }, 3000);
}}>+5</button>
```
