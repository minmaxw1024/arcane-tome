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

## From "Render and Commits"

### 3 Phases of React Component Lifecycle

### Trigger

- initial render
- re-render(state change, props change)

### Render

- initial render(root component)
- re-render(recursively call the function component whose state update triggered the render)

### Commit

- initial render(using `appendChild` to add elements to the DOM)
- re-render(apply minimal changes to the DOM)

React only changes the DOM nodes if there’s a difference between renders.

## Pitfalls

### Hooks can only be called at the top level in a function component.

1. We can't use hooks inside loops, conditions, or nested functions.
2. We can't use hooks in class components.

Only the _top level_ inside our function components.

### Rendering must always be a pure calculation

Again, using pure function like components. Same input, same output. And keeping every component simple and focused, to avoid potential bugs after components grows in complexity.

## Deep Dive

### How does React know which state to return?

Hooks rely on a stable call order on every render of the same component.

```tsx
type StatePair<T> = [T, (nextState: T) => void];
let componentHooks: StatePair<any>[] = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState<T>(initialState: T) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState: T) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}
```

### Optimizing performance 01

If the component we want to update is in the very high position of the tree, it will trigger a lot of re-renders. Not a good idea.

## References

- [React Hooks, no magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
