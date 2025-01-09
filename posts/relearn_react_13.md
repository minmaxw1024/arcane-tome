---
title: Relearn React 13
published_at: 2024-11-27T15:00:00.000Z
snippet: Sharing state between components.
---

## From "Sharing State Between Components"

### Lifting state up

Lifting state up is a technique to share state between components. It involves moving the state to the closest common ancestor of the components that need to share the state.

1. Identify the common ancestor of the components that need to share the state.
2. Move the state to the common ancestor.
3. Pass the state and the functions to update the state as props to the components that need to share the state.

### Single Source of Truth

Single Source of Truth is a principle that states that the state of the application should be stored in a single place. This makes it easier to manage the state and keep it in sync.

## Deep Dive

### Controlled vs Uncontrolled components

Controlled components are components that receive their state and the functions to update the state as props. They are controlled by the parent component.

Uncontrolled components are components that manage their own state. They are not controlled by the parent component.

## References

- [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
