---
title: React Hooks，不是魔法，只是数组
published_at: 2024-11-28T15:00:00.000Z
snippet: 了解 React Hooks 如何通过数组管理状态，以及为什么 React 强制执行严格的使用规则。
---

# React Hooks：不是魔法，只是数组

## 引言

这篇文章在 React 官方教程中被提起过，作者 Rudi Yardley 解释了 React Hooks
的工作原理，通过展示 Hooks 如何通过数组管理组件状态，也详细讲了 React
为何强制执行严格的使用规则。

## 什么是 Hooks？

React Hooks 是 React 16.8 引入的函数，用于在函数组件中管理状态和副作用。常见的
Hooks 包括用于管理状态的 `useState` 和处理副作用的 `useEffect`。

### 核心概念：基于数组的状态管理

Hooks 依赖于内部的数组结构存储状态值。每个 Hook
对应该数组的一个特定索引。当组件重新渲染时，React 确保 Hook
的调用顺序与最初的渲染一致，从而维持状态的稳定访问。

### 一致性规则

为了实现可预测的行为，React 强制执行以下规则：

1. **只能在顶层调用 Hooks。** 避免在循环、条件或嵌套函数中调用
   Hooks，以确保调用顺序的一致性。
2. **只能在 React 函数中调用 Hooks。** Hooks 设计用于函数组件或自定义
   Hooks，而非普通的 JavaScript 函数。

### 实现揭秘

Hooks 的概念实现可能如下：

- React 为每个组件维护一个状态数组。
- 一个光标跟踪当前的索引。
- Hook 的调用会递增光标，确保每次调用都访问正确的状态切片。

示例：

```javascript
const state = [];
let cursor = 0;

function useState(initialValue) {
  const currentCursor = cursor;
  state[currentCursor] = state[currentCursor] || initialValue;
  const setState = (newValue) => {
    state[currentCursor] = newValue;
  };
  cursor++;
  return [state[currentCursor], setState];
}
```

## 为什么需要这些规则

Hooks 的严格规则旨在：

- 确保跨渲染状态处理的一致性。
- 防止由于状态索引错位引发的错误。
- 为开发者提供可预测且可靠的行为。

### 调试和心理模型

将 Hooks
视为操作数组的工具有助于开发者有效地调试与状态相关的问题。例如，如果由于条件语句改变了
Hook 的调用顺序，可能会抛出关于 Hook 不匹配或状态更新不正确的错误。

### Setter 函数和状态更新

像 `useState` 这样的 Hook 返回绑定到特定数组索引的 setter 函数。这些 setter
确保仅更新状态数组的正确部分，从而维护状态管理的完整性。

### 实用要点

- **始终以相同的顺序调用 Hooks。** 这能保证 React 将状态值匹配到相应的 Hook。
- **理解规则以便高效调试。** 理解 Hooks 如何与 React
  内部状态数组交互，有助于解决状态不一致问题。

## 结论

React Hooks
简化了函数组件中的状态和副作用管理，但它们的强大功能伴随着责任。通过了解 Hooks
的数组机制以及遵守 React 的规则，开发者可以利用 Hooks
构建健壮且可预测的应用程序。
