---
title: Relearn React 05
published_at: 2024-11-18T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Responding to Events"

Handling events, managing states, and updating the UI are the most common tasks
in React development.

We can pass event handlers function to components as props, because functions
are first-class citizens in JavaScript. This is a very common usage pattern in
UI frameworks.

## Pitfalls

### The function passed to event handlers

`<button onClick={handleClick}>` vs `<button onClick={handleClick()}>`

- The first one passes the function to the event handler.
- The second one calls the function and passes the result to the event handler.
  _This function will execute every time the component renders._ This is not
  what you want.

We can write the second one as an arrow function to avoid this pitfall.

```jsx
<button onClick={() => handleClick()}>Click me</button>;
```

### Event propagation

All events propagate in React except `onScroll`, which only works on the JSX tag
you attach it to.

We can use `e.stopPropagation()` to stop the event from propagating.

### PreventDefault

We can use `e.preventDefault()` to prevent the default behavior of the event.

## Deep Dives

### Capture phase events

There are three phases in event propagation:

- Capturing phase: from window to target, top to bottom
- Target phase: reaches the target
- Bubbling phase: from target to window, bottom to top

```txt
Capturing Phase (Top to Target)   |   Bubbling Phase (Target to Top)
----------------------------------|-----------------------------------
window → document → html → body → div → button
                                 ↳ button → div → body → html → document → window
```

## References

- [Arrow Function](https://javascript.info/arrow-functions-basics)
