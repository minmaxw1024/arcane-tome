---
标题：重新学习 React 06
发布时间：2024-11-19T15:00:00.000Z
简介：从 react.dev 重新学习 React
---

## 来自 "State：组件的记忆"

### 为什么我们需要"state"而不是使用局部变量？

- 改变局部变量不会触发重新渲染
- React 不会在重新渲染之间保持局部变量

### React 中的"state"是什么？

使用 `useState` hooks 生成两个变量：`count` 和 `setCount`。

`count` 是状态变量，用于_保持_值。

`setCount` 是状态设置函数，用于_更新_值。

### 为什么 React useState 使用数组解构？

1. 数组数据结构将变量数量限制为两个。我们只能从 `useState` 数组解构中获得两个变量，如果添加更多变量，会出现错误。

2. 数组解构允许灵活命名变量。你可以随意命名这些变量。

   ```jsx
   // 这些是等价的：
   const [user, setUser] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
   ```

3. 显然比单独返回它们更好。

## 来自 "渲染和提交"

### React 组件生命周期的 3 个阶段

### 触发

- 初始渲染
- 重新渲染（状态改变，属性改变）

### 渲染

- 初始渲染（根组件）
- 重新渲染（递归调用状态更新触发渲染的函数组件）

### 提交

- 初始渲染（使用 `appendChild` 将元素添加到 DOM）
- 重新渲染（对 DOM 应用最小的更改）

React 只在渲染之间有差异时才更改 DOM 节点。

## 常见陷阱

### Hooks 只能在函数组件的顶层调用。

1. 我们不能在循环、条件或嵌套函数中使用 hooks。
2. 我们不能在类组件中使用 hooks。

只能在函数组件的_顶层_使用。

### 渲染必须始终是纯计算

再次强调，使用纯函数作为组件。相同输入，相同输出。并保持每个组件简单且专注，以避免组件复杂度增长后可能出现的 bug。

## 深入理解

### React 如何知道要返回哪个状态？

Hooks 依赖于同一组件每次渲染时的稳定调用顺序。

```tsx
type StatePair<T> = [T, (nextState: T) => void];
let componentHooks: StatePair<any>[] = [];
let currentHookIndex = 0;

// useState 在 React 内部的工作原理（简化版）
function useState<T>(initialState: T) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染，
    // 所以状态对已经存在。
    // 返回它并为下一个 Hook 调用做准备。
    currentHookIndex++;
    return pair;
  }

  // 这是我们第一次渲染，
  // 所以创建一个状态对并存储它。
  pair = [initialState, setState];

  function setState(nextState: T) {
    // 当用户请求状态更改时，
    // 将新值放入对中。
    pair[0] = nextState;
    updateDOM();
  }

  // 存储这个对以供将来渲染使用
  // 并为下一个 Hook 调用做准备。
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}
```

### 性能优化 01

如果我们要更新的组件在树的很高位置，它会触发大量重新渲染。这不是一个好主意。

## 参考资料

- [React Hooks，没有魔法，只是数组](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)