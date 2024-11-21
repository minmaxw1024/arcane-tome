---
title: Relearn React 06
published_at: 2024-11-19T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "State: A Component's Memory"

### Why do we need "state" instead of using local variables?

- Change local variable won't trigger re-rendering
- React don't persist local variables between re-renders

### What is "state" in React?

using `useState` hooks to generate two variables: `count` and `setCount`.

`count` is the state variable, to _retain_ the value.

`setCount` is the state setter function, to _update_ the value.

### Why do React useState use array destructuring?

1. Array data structure will limit the number of variables to two. We could only
   get two variables from `useState` array destructuring, if you add more
   variables, you will get an error.

2. Array destructuring allows flexibility in naming the variables. You can name
   the variables whatever you want.
   ```jsx
   // These are equivalent:
   const [user, setUser] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
   ```
3. Obviously better than return them separately.

## Pitfalls

### Hooks can only be called at the top level in a function component.

1. We can't use hooks inside loops, conditions, or nested functions.
2. We can't use hooks in class components.

Only the *top level* inside our function components.

## Deep Dive

### How does React know which state to return?

## References

- [React Hooks, no magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)