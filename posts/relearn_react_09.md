---
title: Relearn React 07
published_at: 2024-11-20T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Updating Objects in State"

### Using 'Immer' for complex state updates

## Deep Dive

### Local mutation is fine

Local mutation means directly modifying a variable, property, or object inside a component.

If we don't update the object in an existing state, it's Ok.

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

### Using a single event handler for multiple fields

Using `[name]` to update the object in the state. This is useful when we have multiple fields in a form.

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setValues({
    ...values,
    [name]: value,
  });
};
```

### Objects are not really nested

I don't know this before.

## Related Topics

- Deep copy vs shallow copy
- Basic types in JavaScript
