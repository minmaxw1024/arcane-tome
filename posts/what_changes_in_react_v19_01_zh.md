---
title: React 19 有哪些变化 - 1
published_at: 2024-12-09T15:00:00.000Z
snippet: React V19 change log 解读.
---

React 19 就这么突然的发布了, 其实在去年的 React 开发者大会上就有预告, 这个版本会带来一些重大的变化, 目前我们公司的技术栈已经从 Vue 迁移到了 React, 了解新的 React 变化对我来说还是挺重要的, 接下来几天我阅读 React 19 的官方博客, 把变化记录下来, 也方便大家了解.

## React 19 新特性总结

React 19 带来了很多新特性, 官方文档第一部分就是新特性的总结:

## 新功能：Actions

在 React 应用中，常见的需求是执行数据变更并更新状态，例如用户提交表单后修改名称。在 React 19 中，引入了 **Actions** 来自动管理这些操作，从而简化开发流程：

- **异步过渡**：支持使用 `useTransition` 自动管理 `isPending` 状态。
- **挂起状态**：Actions 提供了请求开始到结束的挂起状态。
- **乐观更新**：通过新钩子 `useOptimistic` 支持即时反馈。
- **错误处理**：Actions 提供内置的错误处理机制。
- **表单支持**：表单的 `action` 和 `formAction` 属性可以直接传递函数，自动提交并重置表单。

使用示例：

```javascript
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) return error;
      redirect("/path");
      return null;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input name="name" defaultValue={name} />
      <button disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

## 新钩子：`useActionState`

`useActionState` 用于简化 Actions 的常见用例：

- 接受一个异步函数并返回错误状态、提交函数和挂起状态。
- 适用于处理乐观更新和表单提交。

---

## 新钩子：`useOptimistic`

`useOptimistic` 支持在请求进行时显示乐观状态，操作完成后自动回退到真实状态。例如：

```javascript
function ChangeName({ currentName, onUpdateName }) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async (formData) => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction}>
      <input name="name" defaultValue={optimisticName} />
      <button>Change Name</button>
    </form>
  );
}
```

---

## 新 API：`use`

React 19 提供了 `use` API，用于在渲染期间读取资源（例如 Promise 或 Context），支持挂起并自动切换状态：

```javascript
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // 自动挂起直到数据加载完成
  return comments.map((comment) => <p>{comment}</p>);
}
```

注意事项：

- 不支持在渲染过程中创建的 Promise。
- 支持条件调用，未来可能扩展更多资源类型。

---

## React DOM 静态 API

新增两个静态站点生成 API：

- `prerender`
- `prerenderToNodeStream`

这些 API 支持等待数据加载并生成静态 HTML，适用于 Node.js 和 Web 流环境。

示例：

```javascript
import { prerender } from "react-dom/static";

async function handler(request) {
  const { prelude } = await prerender(<App />, {
    bootstrapScripts: ["/main.js"],
  });
  return new Response(prelude, { headers: { "content-type": "text/html" } });
}
```

---

## React Server Components

**服务器组件**允许在客户端应用或 SSR 服务器之外的环境中提前渲染组件：

- 稳定版本可用，但底层 API 尚未完全固定。
- 支持全栈 React 架构。

---

## Server Actions

**服务器操作**支持从客户端组件调用在服务器上执行的异步函数：

- 通过 `"use server"` 指令创建服务器操作。
- 服务器组件不需要特殊指令。
