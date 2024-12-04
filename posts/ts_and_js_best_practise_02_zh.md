---
title: JavaScript 和 TypeScript 最佳实践
published_at: 2024-12-02T15:00:00.000Z
snippet: 这篇文章作者详细介绍了不少 JS 和 TS 中的最佳实践, 非常实用。
---

## 命名规则

### 文件/文件夹

1. **文件夹**：

   - 一般用小写加连字符，例如 `shared-utils/`。
   - React 中包含组件的文件夹可用首字母大写，例如 `Home/` 包含 `Home.tsx` 和 `Home.test.tsx`。

2. **文件命名**：
   - **声明脚本**：文件名应与声明名称匹配，例如导出 `useSetState` 的文件应命名为 `useSetState.ts`。
   - **模块脚本**：使用 PascalCase，例如 `UserRepo.ts`。
   - **库存脚本**：使用小写加连字符，例如 `shared-types.ts`。
   - **线性脚本**：使用小写加连字符，例如 `setup-db.ts`。
   - **辅助测试文件夹**：以双下划线包裹，例如 `__test-helpers__/`。

---

### 变量命名

1. **全局静态变量**：

   - 用大写加下划线（`UPPER_SNAKE_CASE`），例如：`const SALT_ROUNDS = 12;`。
   - 简单的数组或对象（没有嵌套）也用 `UPPER_SNAKE_CASE`。

2. **局部变量**：

   - 在函数内部声明的变量使用 `camelCase`。
   - 布尔变量一般以 `is` 开头，例如：`session.isLoggedIn`。

3. **相关变量分组**：
   - 使用单个声明块定义相关变量，提高代码可读性和性能，但不要过度使用。
   ```typescript
   const FOO_BAR = "abc",
     MAX_COUNT = 10;
   ```

---

### 函数命名

1. **格式**：

   - 一般使用 `camelCase`。
   - JSX 组件使用 `PascalCase`。
   - 函数名应反映动作，使用动词格式，例如 `fetchName()`。
   - 简单的常量返回函数可省略动词：

   ```typescript
   const Errors = {
     SomeError: "Error message",
     EmailNotFound(email: string) {
       return `User with email "${email}" not found.`;
     },
   } as const;
   ```

2. **特殊规则**：
   - 辅助函数（仅限文件内部使用）用下划线开头，例如：`function _helperFn() {}`。
   - IO 数据返回用 `fetch`，非 IO 数据返回用 `get`，例如：
     - `user.getFullName()`
     - `UserRepo.fetchUser()`。

---

### 对象命名

1. **不可变对象**：

   - 全局静态对象使用 `UPPER_SNAKE_CASE`。
   - 模块或声明脚本导出的对象使用 `PascalCase`，并用 `as const` 标记为不可变。

2. **动态对象**：
   - 在函数内部的对象用 `camelCase`。
   - 运行时返回的动态对象也用 `camelCase`。

---

### 类和枚举

1. **类**：

   - 类名用 PascalCase。
   - 类的静态只读变量用 PascalCase，例如 `Dog.Species`。
   - 实例变量和方法用 `camelCase`。

2. **枚举**：
   - 枚举名和键均用 PascalCase，例如：
     ```typescript
     enum NodeEnvs {
       Dev = "development",
       Prod = "production",
     }
     ```

---

### 类型和接口

1. **类型别名**：

   - 类型名以 `T` 开头，例如：`type TMouseEvent = React.MouseEvent<HtmlButtonElement>;`。

2. **接口**：
   - 接口名以 `I` 开头，例如：`interface IUser { name: string; email: string; }`。

---

### 注释规则

1. **函数注释**：

   - 使用 `/** Comment */` 格式，放在函数声明上方，首字母大写并以句号结束。

   ```typescript
   /**
    * Add two numbers.
    */
   function add(a: number, b: number): number {
     return a + b;
   }
   ```

2. **代码块注释**：

   - 在函数内部用 `//` 注释，注释首字母大写并以句号结束。

3. **分隔代码块**：

   - 用 `// **** Section Name **** //` 分隔文件的主要部分（变量、类型、函数等）。

4. **复杂逻辑注释**：
   - 对复杂逻辑分块注释，用 `/** */` 分隔大的功能。

---

### 导入规则

1. **组织导入**：

   - 库在顶部，自己代码在下方。
   - 相同目录的导入放在最底部。
   - 超过字符限制的导入单独换行。

2. **示例**：

   ```typescript
   import express from "express";
   import { UserRepo } from "@src/repos/UserRepo";

   import helpers from "./helpers";
   ```

---

### 示例脚本

1. **模块脚本**：

   ```typescript
   // MailUtil.ts
   const SUPPORT_EMAIL = "support@example.com";

   /**
    * Send an email.
    */
   function sendEmail(to: string, subject: string, body: string) {
     console.log(`Sending email to ${to}`);
   }

   export default {
     sendEmail,
   } as const;
   ```

2. **声明脚本**：

   ```typescript
   // EnvVars.ts
   export default {
     PORT: process.env.PORT,
     DB_HOST: process.env.DB_HOST,
   } as const;
   ```

3. **线性脚本**：

   ```typescript
   // server.ts
   import express from "express";

   const app = express();

   app.use(middleware);

   export default app;
   ```

---

### 其他代码风格

1. **布尔表达式**：

   - 用括号提升可读性：
     ```typescript
     if ((isFoo && isBar) || isBaz) {
       console.log("Condition met.");
     }
     ```

2. **可选链**：

   - 使用 `?.` 替代 `foo && foo.bar`。
   - 使用 `??` 替代 `(str || '')`。

3. **长条件语句**：

   - 每行一个逻辑条件，嵌套逻辑缩进。
     ```typescript
     if (user?.isActive && (role !== "ADMIN" || permissions?.length > 0)) {
       // Do something
     }
     ```

4. **对象参数格式**：
   - 对象字面量的花括号放在函数参数同一行：
     ```typescript
     doSomething("arg1", { key: "value" }, "arg2");
     ```
