---
title: Relearn React 08
published_at: 2024-11-20T15:00:00.000Z
snippet: Relearning React from react.dev, batching state updates.
---

## From "Queueing a Series of State Updates"

There is a common sense that React will batch multiple `setState` calls into a single update, and re-render the component only once.

- `setState` triggers re-rendering, do not change the state directly.
- React processes multiple `setState` calls after event handlers have finished running, this is called "batching".

### Two ways to setState

- A value we want to update.
- A updater function that receives the state as an argument and returns a new state.

#### Some best practices

- updater function has only one argument.
- updater function is pure.
- updater function is synchronous.
- updater function's argument naming should be the first letters of the state's name.

### What did updater function do?

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.

This sample is very useful to understand how updater function works and the state snapshot we mentioned before.

```jsx
import { useState } from "react";

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending((p) => p + 1);
    await delay(3000);
    setPending((p) => p - 1);
    setCompleted((c) => c + 1);
  }

  return (
    <>
      <h3>Pending: {pending}</h3>
      <h3>Completed: {completed}</h3>
      <button onClick={handleClick}>Buy</button>
    </>
  );
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```
