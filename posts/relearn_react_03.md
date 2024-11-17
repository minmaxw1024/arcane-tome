---
title: Relearn React 03
published_at: 2024-11-15T15:00:00.000Z
snippet: Relearning React from react.dev
---

## From "Conditional Rendering"

Conditional rendering may be the most used feature in daily React development. It allows you to render different components or elements based on a condition.

If you return `null` from a component, nothing will be rendered.

And using ternary operator is a common way to conditionally render elements.

Using `&&` is another way to conditionally render elements. It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

```jsx
// isPacked is true, render "✅", or render nothing.
return (
  <li className="item">
    {name} {isPacked && "✅"}
  </li>
);
```

Using variables to store elements is another way to conditionally render elements.

## Pitfalls

### Using `&&` for Conditional Rendering

Don’t put numbers on the left side of &&.

To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is 0, then the whole expression gets that value (0), and React will happily render 0 rather than nothing.

For example, a common mistake is to write code like `messageCount && <p>New messages</p>`. It’s easy to assume that it renders nothing when `messageCount` is 0, but it really renders the 0 itself!

To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

## Deep Dive

### What's the difference between these two code snippets?

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

```jsx
return <li className="item">{isPacked ? name + " ✅" : name}</li>;
```

> JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. So these two examples, in fact, are completely equivalent.

## Rendering Lists

- [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself)
- [Logical And &&](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
