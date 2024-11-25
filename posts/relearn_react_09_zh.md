---
title: 重新学习 React 09
published_at: 2024-11-22T15:00:00.000Z
snippet: 从 react.dev 重新学习 React
---

## 来自 “更新状态中的对象”

为什么作者在整章中都在解释如何更新对象？

### 使用 'Immer' 处理复杂的状态更新

## 深入探讨

### 局部修改是可以的

局部修改是指在组件内部直接修改变量、属性或对象。

如果我们不更新现有状态中的对象，这是可以的。

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

````
### 使用单个事件处理器更新多个字段

通过使用 `[name]` 来更新状态中的对象。这在表单中有多个字段时非常有用。

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setValues({
    ...values,
    [name]: value,
  });
};
```

### 对象其实并没有真正嵌套

之前我不知道这一点，其实我了解 JavaScript
中的对象引用，但从未思考过嵌套对象中的引用。

在 JavaScript 中，对象并没有真正嵌套，它们只是通过引用在内存中连接起来。

```jsx
const obj = {
  a: {
    b: 1,
  },
};

const obj2 = obj;
obj2.a.b = 2;
console.log(obj.a.b); // 2
```

### Immer 是如何工作的？

Immer 是一个库，它允许我们创建一个对象的草稿，然后将更改应用到原始对象。

```jsx
const obj = {
  a: {
    b: 1,
  },
};

const draft = produce(obj, (draft) => {
  draft.a.b = 2;
});

console.log(draft); // { a: { b: 2 } }
console.log(obj); // { a: { b: 1 } }
```

Immer 背后的技术是
[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。

### 为什么在 React 中不推荐直接修改状态？

- **调试**：使用不可变状态，可以通过 `console.log` 查看状态随时间的变化。
- **优化**：状态不可变时，更容易且更快地检查 `useMemo`。
- **新功能**：某些 React 新功能依赖于状态快照，使用不可变数据能让新功能更顺畅。
- **需求变更**：一些功能如“复制/粘贴”和“撤销/重做”依赖于不可变数据。
- **简单性**：React 不依赖状态的引用，因此我们不需要用 Proxy
  包装对象或添加额外代码来处理引用。

## 相关话题

- 深拷贝 vs 浅拷贝 和扩展运算符
- JavaScript 的基本类型
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
````
