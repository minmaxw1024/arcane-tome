---
title: 重新学习 React 10
published_at: 2024-11-25T15:00:00.000Z
snippet: 从 react.dev 重新学习 React
---

## 来自 “更新状态中的数组”

对于数组和对象，我们应该：

- 将它们视为只读状态。
- 创建一个新的数组或对象来存储更新后的值。

|        | 避免（会修改数组） | 推荐（返回一个新数组）    |
| ------ | ------------------ | ------------------------- |
| 添加   | push, unshift      | concat, [...arr] 扩展语法 |
| 删除   | pop, shift, splice | filter, slice             |
| 替换   | splice, arr[i] = x | map                       |
| 重排序 | reverse, sort      | 先复制数组                |
| 插入   | splice             | slice + concat 或扩展语法 |

或者，对于复杂状态更新可以使用 `Immer`。

### 插入一个元素

```jsx
const arr = [1, 2, 3, 4, 5];
const insertAt = 2;
const newArr = [...arr.slice(0, insertAt), 6, ...arr.slice(insertAt)];
console.log(newArr); // [1, 2, 6, 3, 4, 5]
```

## 注意事项

### `slice` vs `splice`

`slice` 提取数组的一部分并返回一个新数组，而 `splice` 则从数组中移除元素并返回被移除的元素。

```jsx
const arr = [1, 2, 3, 4, 5];
const newArr = arr.slice(1, 3); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5]

const removed = arr.splice(1, 2); // [2, 3]
console.log(arr); // [1, 4, 5]
```

主要区别在于 `slice` 不会修改原始数组，而 `splice` 会。
因此，我们推荐使用 `slice` 来提取数组的部分内容。
