---
title: Relearn React 07
published_at: 2024-11-20T15:00:00.000Z
snippet: Relearning React from react.dev, is state a snapshot?
---

## From "State as a Snapshot"

State is defined inside a component but is managed by React, outside our
component. React keeps track of the state of each component and when the state
changes, React will re-render the component.

### What happens when state changes?

When the state of a component changes, React will re-render the component.

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen(DOM) to match the snapshot your function
   returned.

### What are includes in a snapshot?

A component "snapshot" includes the following:

- props
- event handlers
- local variables

It means, every render has its own props, event handlers, and local variables.

This is why in the below example, the alert number is 0, because this event
handler captures the state number at the time of the click event. Conversely, it
means every render has its own event handlers, props and state.

```jsx
# state number is 0

<button onClick={() => {
  setNumber(number + 5);
  setTimeout(() => {
    alert(number);
  }, 3000);
}}>+5</button>
```
