---
title: Relearn React 02
published_at: 2024-11-14T15:00:00.000Z
snippet: Relearning React from react.dev, from "Writing Markup with JSX"
---

## From "Writing Markup with JSX"

### Why do we use JSX?

JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML. JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.

> JSX and React are two separate things. They’re often used together, but you can use them independently of each other. JSX is a syntax extension, while React is a JavaScript library.

### Rules of JSX

- Return a single element.

- Close all the tags, even it's self-closing.

- Use camelCase for HTML attributes.

Error messages will often point you in the right direction to fixing your markup.

### Convert existing HTML to JSX

Using [Convert HTML to JSX](https://transform.tools/html-to-jsx) to convert HTML to JSX.

## From "JavaScript in JSX with Curly Braces"

- using `{}` to embed JavaScript expressions in JSX.

- using "" or '' to embed string literals in JSX.

- using `{{}}` to embed an object literal in JSX or pass style object to a component's style attribute.

## From "Passing Props to a Component"

- using destructuring assignment to extract the props(if the props are easy to extract), and you also can use destructuring to assign default values to the props.

- using spread operator to pass props to a component. *Use spread syntax with restraint, because it can make your code harder to understand.*

```jsx
// const props = { name: "John", age: 42, img: "url", alt: "profile" };
// <Profile {...props} />;

function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

## Pitfalls

### Is there any un-camelCase attribute?

For historical reasons, `aria-*` and `data-*` attributes are written as in HTML with dashes. For example, `aria-label`, `data-id`.

### Inline styles

Inline style properties are written in camelCase. For example, HTML `<ul style="background-color: black">` would be written as `<ul style={{ backgroundColor: 'black' }}>` in your component.

## Deep Dive

### Why do multiple JSX tags need to be wrapped?

Because JSX looks like HTML, but it will transform into plain JavaScript objects after all. So we need to wrap multiple JSX tags into a single parent element, or we can use a Fragment to wrap them.

## References

- [All the component for React's JSX](https://react.dev/reference/react-dom/components/common)
