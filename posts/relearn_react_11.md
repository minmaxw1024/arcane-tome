---
title: Relearn React 11
published_at: 2024-11-26T15:00:00.000Z
snippet: Relearning React from react.dev, yes, arrays.
---

## From "Reacting to Input with State"

### Declarative vs Imperative

React is declarative, which means you describe what you want to happen, and React takes care of the rest.

In imperative programming, you describe each step to achieve a result.

```jsx
// Imperative
const element = document.createElement("h1");
element.textContent = "Hello, world!";
document.body.appendChild(element);
element.textContent = "Hello, React!";
```

In declarative programming, you describe the result you want, and React takes care of the rest.

```jsx
// Declarative
function Greeting() {
  const [name, setName] = useState("Hello, world!");
  return <h1>{name}</h1>;
}

// in some event handler
setName("Hello, React!");
```

### How to develp a component

1. find out all the visual states.
2. determine the human or computer events that can change each state.
3. using `useState` to declare the state variables.
4. remove unnecessary state variables.
5. connect the event handlers to change the state variables, using `useState`'s setter functions.

## Deep Dive

### Eliminating "impossible" states with a reducer

Reducers let us unify multiple state variables into a single object and consolidate all the related logic. This can help us avoid "impossible" states in our application.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

## References

- [Finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine)
