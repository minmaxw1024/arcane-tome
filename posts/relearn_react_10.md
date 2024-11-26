---
title: Relearn React 10
published_at: 2024-11-25T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Updating Arrays in State"

For both arrays and objects, we should:

- treat them as read-only state.
- create a new array or object with the updated values.

|            | avoid (mutates the array) | prefer (returns a new array)    |
| ---------- | ------------------------- | ------------------------------- |
| adding     | push, unshift             | concat, [...arr] spread syntax  |
| removing   | pop, shift, splice        | filter, slice                   |
| replacing  | splice, arr[i] = x        | map                             |
| reordering | reverse, sort             | copy the array first            |
| inserting  | splice                    | slice + concat or spread syntax |

or use `Immer` for complex state updates.

### inserting an element

```jsx
const arr = [1, 2, 3, 4, 5];
const insertAt = 2;
const newArr = [...arr.slice(0, insertAt), 6, ...arr.slice(insertAt)];
console.log(newArr); // [1, 2, 6, 3, 4, 5]
```

## Pitfalls

### `slice` vs `splice`

`slice` extracts a section of an array and returns a new array, while `splice` removes elements from an array and returns the removed elements.

```jsx
const arr = [1, 2, 3, 4, 5];
const newArr = arr.slice(1, 3); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5]

const removed = arr.splice(1, 2); // [2, 3]
console.log(arr); // [1, 4, 5]
```

The main difference is that `slice` does not mutate the original array, while `splice` does.
So we recommend using `slice` for extracting a section of an array.
