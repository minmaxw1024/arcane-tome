---
title: 重学 React 04
published_at: 2024-11-17T15:00:00.000Z
snippet: Relearning React from react.dev
---

## 从"渲染列表"说起

在日常开发中，渲染列表是一个常见的任务。`map()` 和 `filter()` 可能是我的 React
项目中最常用的数组方法。

## 从"保持组件的纯净性"说起

React 假定每个组件都是纯的，就像一个纯函数一样，而且大多数 React
组件实际上就是纯函数。

## 理解你的 UI 作为一个树结构

浏览器使用树结构来渲染 HTML（DOM）和 CSS（CSSOM）。React
同样也是以树结构的方式渲染 UI。从根组件到叶子组件。

### 渲染树和依赖树

- 渲染树：_UI_ 组件的树结构。
- 依赖树：_模块_ 依赖的树结构。

如何最小化打包体积是优化网页加载速度的常见实践。

### 纯函数

- 相同输入，相同输出
- 只关注自己的事务

## 常见陷阱

### 箭头函数和 `return`

在使用箭头函数时，隐式返回是一个常见的陷阱。

```jsx
const listItems = items.map((item) => <li key={item.id}>{item.name}</li>);

//等同于

const listItems = items.map((item) => {
    return <li key={item.id}>{item.name}</li>;
});
```

箭头函数可以不使用 `{}` 和 `return` 来使代码更简洁。你可以在 `=>`
后面直接连接一个 JavaScript 表达式，它会自动返回。

但是，如果你想返回一个对象字面量，你需要用括号把它包起来。

```jsx
const listItems = items.map((item) => ({ id: item.id, name: item.name }));
```

### Key

是的，在渲染元素列表时你需要一个 `key` 属性。这个 `key` 帮助 React
识别哪些项应该被修改、添加或删除。

最佳实践是为 `key` 属性使用唯一标识符。

- 使用来自数据库的 id 或 key
- 在本地生成唯一的 key，使用像 `uuid` 或 `crypto.randomUUID()` 这样的库

#### 不推荐使用 `index` 作为 `key`

因为当列表重新排序时，`key` 也会重新生成，这也是当我们不提供 `key` 属性时 React
的处理方式。

### 即时生成 `key`

```jsx
// 即时生成随机 key，不推荐
const listItems = items.map((item, index) => (
    <li key={Math.random()}>{item.name}</li>
));
```

上面的代码片段是不推荐的，因为 key 会在每次渲染时重新生成。这会导致每次渲染时
key 都不匹配，进而导致所有组件和 DOM
都被重新创建。这不仅会降低性能，还会丢失列表项中的用户输入。相反，应该使用基于数据的稳定
ID。

### `key` 属性不会传递给组件

`key` 属性是 React 中的一个特殊属性，它不会被传递给组件。

## 深入探讨

### Fragment

使用 `Fragment` 组件来包装多个元素，神奇的是，当 DOM 被渲染时，`Fragment`
不会被渲染，只有它的子元素会被渲染。

### 使用 StrictMode 检测不纯的计算

React 的 'StrictMode'
会在开发过程中调用组件函数两次，让我们知道组件是否不纯。这意味着，如果一个组件是不纯的，在调用组件函数两次后，结果会不同。

### 为什么 React 关心纯度？

- 跨环境的一致性：由于纯组件每次都产生相同的输出，无论是在服务器端还是客户端都是如此。

- 性能优化：React
  可以跳过未更改的组件的渲染，因为纯函数对相同的输入总是返回相同的结果，使缓存安全且有效。

- 高效渲染：在渲染过程中如果数据发生变化，React
  可以在不完成过时进程的情况下重新启动，这要归功于纯度提供的安全性。

- 面向未来：纯度是 React 设计的核心，编写纯组件将使你的代码适应未来的 React
  特性和更新。

### React 渲染树中的 HTML 标签在哪里？

React 在渲染树中不渲染 HTML 标签，它渲染 React 组件。这是因为 React
是一个用于构建用户界面的 UI 框架，它可以在不同平台上渲染，而不仅仅是在浏览器中。

这些 HTML 标签是来自浏览器平台的 UI 元素，就像在 iOS 中，`UIView` 是 UI
元素，它们不是 React 的一部分。

## 参考资料

- [JavaScript 数组方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- [打包工具](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem)
