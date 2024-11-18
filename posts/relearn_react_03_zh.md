---
title: 重学 React 03
published_at: 2024-11-15T15:00:00.000Z
snippet: Relearning React from react.dev
---

## 从“条件渲染”

条件渲染可能是日常 React 开发中最常用的功能。它允许你根据条件渲染不同的组件或元素。

如果你从组件中返回 `null`，则不会渲染任何内容。

使用三元运算符是条件渲染元素的一种常见方式。

使用 `&&` 是另一种条件渲染元素的方式。因为在 JavaScript 中，`true && 表达式`
总是返回 `表达式`，而 `false && 表达式` 总是返回 `false`。

```jsx
// isPacked 为 true 时，渲染 "✅"，否则不渲染任何内容。
return (
    <li className="item">
        {name} {isPacked && "✅"}
    </li>
);
```

使用变量存储元素是另一种条件渲染元素的方式。

## 坑点

### 使用 `&&` 进行条件渲染

不要在 `&&` 的左侧放置数字。

为了测试条件，JavaScript 会自动将左侧转换为布尔值。然而，如果左侧是
0，那么整个表达式将得到该值（0），而 React 会愉快地渲染 0 而不是不渲染任何内容。

例如，一个常见的错误是编写类似 `messageCount && <p>New messages</p>`
的代码。很容易假设当 `messageCount` 为 0 时它不会渲染任何内容，但实际上它会渲染
0 本身！

要修复它，请使左侧为布尔值：`messageCount > 0 && <p>New messages</p>`。

## 深入探讨

### 这两段代码有什么区别？

```jsx
if (isPacked) {
    return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

```jsx
return <li className="item">{isPacked ? name + " ✅" : name}</li>;
```

> JSX 元素不是“实例”，因为它们不持有任何内部状态，也不是真实的 DOM
> 节点。所以这两个例子实际上是完全等价的。

## 渲染列表

- [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)（不要重复自己）
- [逻辑与 &&](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
