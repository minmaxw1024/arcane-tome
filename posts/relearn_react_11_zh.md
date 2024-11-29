---
title: 重新学习 React 11
published_at: 2024-11-26T15:00:00.000Z
snippet: 从 react.dev 重新学习 React，没错，关于数组。
---

## 来自 “用状态响应输入”

### 声明式 vs 命令式

React 是声明式的，这意味着你只需要描述你想要发生的事情，React 会处理其余部分。

在命令式编程中，你需要描述实现结果的每一步。

```jsx
// 命令式
const element = document.createElement("h1");
element.textContent = "Hello, world!";
document.body.appendChild(element);
element.textContent = "Hello, React!";
```

在声明式编程中，你只需要描述你想要的结果，React 会处理其余部分。

```jsx
// 声明式
function Greeting() {
  const [name, setName] = useState("Hello, world!");
  return <h1>{name}</h1>;
}

// 在某些事件处理器中
setName("Hello, React!");
```

### 如何开发一个组件

1. 找出所有的视觉状态。
2. 确定能改变每个状态的人类或计算机事件。
3. 使用 `useState` 声明状态变量。
4. 移除不必要的状态变量。
5. 连接事件处理器，通过 `useState` 的 setter 函数改变状态变量。

## 深入探讨

### 使用 reducer 消除“不可能”的状态

Reducers 让我们可以将多个状态变量合并到一个对象中，并整合所有相关的逻辑。这可以帮助我们避免应用中的“不可能”状态。

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

## 参考资料

- [有限状态机](https://en.wikipedia.org/wiki/Finite-state_machine)

```

```
