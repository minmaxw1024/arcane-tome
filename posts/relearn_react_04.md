---
title: Relearn React 04
published_at: 2024-11-17T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Rendering Lists"

Rendering lists is a common task in daily development. `map()` and `filter()`
may be the most used array methods in my React projects.

## From "Keeping Components Pure"

React assume that every component is pure, like a pure function, and most of the
React components are pure function literally.

## From "Understanding Your UI as a Tree"

Browser is using tree structures to render HTML(DOM) and CSS(CSSOM). React is
rendering UI as a tree structure as well. From the root component to the leaf
component.

### Render tree and dependency tree

- Render tree: the tree structure of the _UI_ components.
- Dependency tree: the tree structure of the _module_ dependencies.

How to minimalize the bundle size is a common practice to optimize the web load
speed.

### Pure Function

- same input, same output
- it minds its own business

## Pitfalls

### Arrow function and `return`

Implicit return is a common pitfall when using arrow functions.

```jsx
const listItems = items.map((item) => <li key={item.id}>{item.name}</li>);

//same as

const listItems = items.map((item) => {
    return <li key={item.id}>{item.name}</li>;
});
```

Arrow function may not using `{}` and `return` to make the code more concise.
You can concat a JavaScript expression after `=>` and it will be returned
automatically.

However, if you want to return an object literal, you need to wrap it in
parentheses.

```jsx
const listItems = items.map((item) => ({ id: item.id, name: item.name }));
```

### Key

And yes, you need a `key` prop when rendering a list of elements. This `key`
help React identify which items should be modified, added or removed.

Best practice is to use a unique identifier for the `key` prop.

- using an id or key from database.
- generate a unique key locally, using a library like `uuid` or
  `crypto.randomUUID()`.

#### Using `index` as `key` is not recommended

Because when the list is reordered, the `key` will regenerate as well, and this
is what React do if we don't provice a `key` prop.

### Generate `key` on the fly

```jsx
// generate a random key on the fly, not recommended
const listItems = items.map((item, index) => (
    <li key={Math.random()}>{item.name}</li>
));
```

A code snippet above is not recommended, because the key will be regenerated
every render.This will cause keys to never match up between renders, leading to
all your components and DOM being recreated every time. Not only is this slow,
but it will also lose any user input inside the list items. Instead, use a
stable ID based on the data.

### The `key` prop will not be passed to the component

The `key` prop is a special prop in React, it will not be passed to the
component.

## Deep Dive

### Fragment

using `Fragment` component to wrap multiple elements, the magic is, when DOM is
rendered, `Fragment` will not be rendered, only its children will be rendered.

### Detecting impure calculations with StrictMode

React's 'StrictMode' will call the component function twice during development,
to let us know if the component is impure. It means, if a component is impure,
after calling the component function twice, the result will be different.

### Why does React care about purity?

- Consistency across environment: Since pure component produce the same output
  everytime, no matter it's in server or client side.

- Performance Optimization: React can skip rendering unchanged components, as
  pure functions reliably return the same results for identical inputs, making
  caching safe and effective.

- Efficient Rendering: In case of data changes during rendering, React can
  restart without completing the outdated process, thanks to the safety provided
  by purity.

- Future Readiness: Purity is the core of React's design, writing pure
  components will make your code fit for future React features and updates.

### Where are the HTML tags in the React render tree?

React doesn't render HTML tags in the render tree, it renders React components.
This is because React is a UI framework for building user interfaces, it could
render in diffrent platforms, not just in the browser.

These HTML tags are the UI elements from browser platform, as in the iOS, the
`UIView`s will be the UI elements, they are not a part of React.

## References

- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- [Bundler](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem)
