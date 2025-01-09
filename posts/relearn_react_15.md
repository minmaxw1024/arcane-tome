---
title: Relearn React 15
published_at: 2025-01-08T15:00:00.000Z
snippet: Extracting State Logic into a Reducer.
---

## From "Extracting State Logic into a Reducer"

### Why do we use Reducers?

As component grows, the state updating logic can become complex and hard to manage. Reducers help to **consolidate** state updates by combining multiple state changes into a single function. This makes it easier to manage complex state updates and keep the component code clean and readable.

### useState and useReducer

`useReducer` Hook takes two arguments:

1. A reducer function.
2. An initial state.

And returns an array with two elements:

1. A stateful value.
2. A dispatch function.

#### Migrate from `useState` to `useReducer`

1. Move from setting state to dispatching actions.
2. Write a reducer function.
3. Use the reducer from your component.

#### Differences between `useState` and `useReducer`

| Aspect              | `useState`                                                                               | `useReducer`                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Code size           | Less code upfront.                                                                       | Requires writing a reducer function and dispatch actions, but can reduce code if many handlers modify state similarly. |
| Readability         | Easy to read for simple state updates, but can bloat component code for complex updates. | Separates update logic from event handlers, making complex updates easier to manage.                                   |
| Debugging           | Difficult to trace where state was set incorrectly.                                      | Easier to debug by logging state updates and actions in the reducer.                                                   |
| Testing             | State updates are tied to the component.                                                 | Reducers are pure functions that can be tested in isolation.                                                           |
| Personal preference | Some prefer `useState`, others prefer `useReducer`.                                      | Both hooks are equivalent and can be converted back and forth.                                                         |

### Best practices for reducers

1. **Keep reducers pure**: Reducers should not have side effects, such as modifying arguments or calling APIs. They should only calculate the next state based on the current state and action.

2. **Each action describes a single user interaction, even if that leads to multiple changes in the data.** For example, if a user clicks a button to increment a counter and reset a form, you should have two separate actions: `INCREMENT` and `RESET_FORM`.

3. **Using Immer**

## Deep Dives

### Why are reducers called this way?

Reducers are called reducers because they are functions that reduce a collection of values into a single value. In the context of React, reducers are functions that reduce a collection of actions into a single state.
