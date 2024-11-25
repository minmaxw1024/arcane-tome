---
title: Relearn React 09
published_at: 2024-11-22T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Updating Objects in State"

Why do the arther explain how to update objects in the whole chapter?

### Using 'Immer' for complex state updates

## Deep Dive

### Local mutation is fine

Local mutation means directly modifying a variable, property, or object inside a
component.

If we don't update the object in an existing state, it's Ok.

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

### Using a single event handler for multiple fields

Using `[name]` to update the object in the state. This is useful when we have
multiple fields in a form.

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

I don't know this before, actually, I know Object reference in JavaScript, but
never think about object reference in nested objects.

Yes, in JavaScript, objects are not really nested, they are just linked in
~~memory~~, they're connected by references.

```jsx
const obj = {
  a: {
    b: 1,
  },
};

const obj2 = obj;
obj2.a.b = 2;
console.log(obj.a.b); // 2
```

### How does Immer work?

Immer is a library that allows us to create a draft of an object and then apply
the changes to the original object.

```jsx
const obj = {
  a: {
    b: 1,
  },
};

const draft = produce(obj, (draft) => {
  draft.a.b = 2;
});

console.log(draft); // { a: { b: 2 } }
console.log(obj); // { a: { b: 1 } }
```

The technique behind Immer is called
[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Why is mutating state not recommended in React?

- Debugging: Using immutable state, we can see how state changes over time in
  `console.log`.
- Optimizations: it's easier and faster to check `useMemo` when state is
  immutable.
- New Features: Some React new features depends on the snapshot of state, using
  immutable data will make it smoother to use new features.
- Requirements changes: some features like "copy/paste" and "undo/redo" depends
  on immutable data.
- Simplicity: React do not rely on the reference of state, so we don't need to
  wrap the object in proxy or add extra code to handle the reference.

## Related Topics

- Deep copy vs shallow copy, and spread syntax.
- Basic types in JavaScript
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
