---
title: Relearn React 01
published_at: 2024-11-04T15:00:00.000Z
snippet: Relearning React from react.dev
---

I'm relearning React from the official React documentation at [react.dev](https://react.dev). This official documentation is a great resource for learning React.

I'm keeping use React in the past 5 years, from class based components to functional components with hooks, from JavaScript to TypeScript. Recently, I found that this official documentation is so good that I still can learn a lot from it. It has a lot of references of the best practices, it also has a lot of pitfalls and deep dive topics that I didn't know before. I could say this is a hidden gem for me.

I will write down my learning notes here, share with you and hope you can learn something from the documentation as well.

## From "Your Frist Component"

The first section of the documentation is "Your First Component". It's a simple introduction to React.

### export in modern JavaScript and Node.js

In my past projects, I used ESM as default module system, because some JavaScript tools like Webpack, Babel and Vite support ESM out of the box. But in my Node.js project, I still use CommonJS because it's the default module system in Node.js. In recent days, there are some changes in Node.js, it supports ESM as well. And newer JavaScript tools like Deno and Bun are using ESM as default module system. So I think it's time to switch to ESM in my Node.js project.

## Importing and Exporting Components

This section is talking about how to import and export components in React. I think the aurthor is trying to let us know:

- React applications are made up of components.
- Components are reusable and can be nested inside other components.
- Components can be imported and exported.
- Components can be defined in the same file or in separate files.

### Why separate components?

> This lets you keep your files easy to scan and reuse components in more places.

## Pitfalls

### React components and functions

> React components are regular JavaScript functions, but their names must start with a capital letter or they won’t work!

This is a common sense in React.

### Parentheses in JavaScript

> Without parentheses, any code on the lines after return will be ignored!

Maybe this one is a common pitfall in JavaScript?

```javascript
function getObject() {
  return;
  {
    key: "value";
  }
}
```

The code above will return `undefined` because the JavaScript engine will insert a semicolon after `return`, so the code after `return` will be ignored.

```javascript
function getObject() {
  return; // <- JavaScript inserts a semicolon here
  {
    key: "value";
  }
}
```

### Nest components

> Components can render other components, but you must never nest their definitions:
>
> ```javascript
> export default function Gallery() {
>  // 🔴 Never define a component inside another component!
>  function Profile() {
>    // ...
>  }
>  // ...
> }
>
> export default function Gallery() {
>  // ...
> }
>
> // ✅ Declare components at the top level
> function Profile() {
>  // ...
> }
> ```
>
> When a child component needs some data from a parent, pass it by props instead of nesting definitions.

## Deep dives

### Components all the way down

React application, in essence, is a tree of components. Each component is a tree of components. This is a very important concept in React. And there is a root component in the tree, it's the entry point of the application, like `pages/index.js` in Next.js.

Some websites only use React for a small part of the page, like a comment form or a search bar. In this case, you can use React components in a non-React website. You can use `ReactDOM.render()` to render a React component in a non-React website.

### Default vs named exports

init a markdown table

| Syntax         | Export Statement                           | Import Statement                               |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| Default export | `export default function MyComponent() {}` | `import MyComponent from './MyComponent';`     |
| Named export   | `export function MyComponent() {}`         | `import { MyComponent } from './MyComponent';` |

We can rename a default export directly by assigning it any name when importing. For named exports, we can rename them using the `as` keyword.
