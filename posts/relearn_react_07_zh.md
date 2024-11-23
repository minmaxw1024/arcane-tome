---
title: 重新学习 React 07
published_at: 2024-11-20T15:00:00.000Z
snippet: 从 react.dev 重新学习 React
---

## 来自“排队一系列状态更新”

有一种常识认为，React 会将多个 `setState` 调用合并为一次更新，并且只重新渲染组件一次。

- `setState` 会触发重新渲染，不要直接更改状态。
- React 在事件处理程序运行结束后处理多个 `setState` 调用，这被称为“批处理”。

### 设置 State 的两种方式

- 我们想要更新的值。
- 一个更新函数，它接收当前状态作为参数并返回一个新状态。

#### 一些最佳实践

- 更新函数只有一个参数。
- 更新函数是纯函数。
- 更新函数是同步的。
- 更新函数的参数命名应使用状态名称的首字母。

### 更新函数的作用是什么？

1. React 会将这个函数排队，以便在事件处理程序中的所有其他代码运行完毕后进行处理。
2. 在下一次渲染期间，React 会遍历队列并为你提供最终更新后的状态。

这个示例对于理解更新函数的工作原理以及我们之前提到的状态快照非常有用。

```jsx
import { useState } from "react";

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending((p) => p + 1);
    await delay(3000);
    setPending((p) => p - 1);
    setCompleted((c) => c + 1);
  }

  return (
    <>
      <h3>待处理: {pending}</h3>
      <h3>已完成: {completed}</h3>
      <button onClick={handleClick}>购买</button>
    </>
  );
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```
