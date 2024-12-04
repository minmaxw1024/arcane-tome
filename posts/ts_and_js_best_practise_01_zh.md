---
title: JavaScript 和 TypeScript 最佳实践
published_at: 2024-11-29T15:00:00.000Z
snippet: 这篇文章作者详细介绍了不少 JS 和 TS 中的最佳实践, 非常实用。
---

## JavaScript 和 TypeScript 核心概念

### 4 个基础特性

1. **原始类型（Primitives）**

   - 原始类型包括 5 种传统类型：`null`、`undefined`、`boolean`、`number`、`string`，以及新增的两种类型：`symbol` 和 `bigint`。
   - **重点**：
     - `symbol` 主要用于创建对象的唯一键，避免键值冲突。
     - 类型强制（Coercion）：当调用原始类型的函数时，JavaScript 会用其对象包装器（如 `Boolean`、`Number`）包装原始值，从而实现调用。

2. **函数（Functions）**

   - **创建方式**：
     - 函数声明：`function functionName() {}`
     - 箭头函数：`() => {}`
     - 对象字面量中的方法：`{ key: function() {} }`
     - 类方法：`class MyClass { myMethod() {} }`
   - **最佳实践**：
     - 在顶层使用函数声明以利用提升（Hoisting）。
     - 在嵌套函数中使用箭头函数。
     - 单参数箭头函数省略括号：`val => val * 2`。

3. **对象（Objects）**

   - **创建方式**：
     - 对象字面量：`{ key: value }`
     - 使用 `new` 调用构造函数：`new Date()`
     - 类实例化：`class MyClass {}`。
   - **对象字面量**：更适合组织数据和代码，避免使用类的复杂性。
   - **类**：
     - 通常避免用类来处理 IO 数据或作为项目结构的核心。
     - 适合动态数据和需要封装逻辑的场景，例如数据结构（如 `Map`）。
   - **建议**：
     - 对于 IO 数据，使用接口（`interface`）定义数据结构，使用对象字面量组织相关方法。

4. **类型（Types）**
   - **定义方式**：
     - 类型别名：`type MyType = ...`
     - 接口：`interface MyInterface { ... }`
   - **使用场景**：
     - 使用类型别名定义联合类型或简单结构。
     - 使用接口定义复杂对象结构。

---

### 脚本（文件）类型

1. **声明型（Declaration）**

   - 导出单个声明，例如枚举或类型：`HttpStatusCodes.ts`。

2. **模块型（Modular）**

   - 导出包含相关函数或变量的对象字面量：`UserRepo.ts`。

3. **库存型（Inventory）**

   - 存储全局共享的小型声明：`types.ts`。

4. **线性型（Linear）**
   - 执行一系列命令的文件：`setup-db.ts`。

---

### 文件组织结构

- **推荐顺序**：

  1. 变量（只读或常量）
  2. 类型
  3. 运行逻辑（可选，保持短小）
  4. 函数
  5. 类（仅限小型类，大型类应独立文件）

- **注意事项**：
  - `export default` 始终放在文件末尾。
  - 在线性脚本中，代码可按任务分组，而非按类型组织。

---

### 何时使用类？

- **适合场景**：

  - 动态数据需要与方法紧密耦合。
  - 需要封装状态和逻辑，例如数据结构（如 `Map`）。
  - 需要依赖注入，确保在多个地方使用同一实例。

- **避免场景**：
  - 处理 IO 数据：类实例化时方法不会传递，需额外构造或使用静态方法。
  - 项目核心架构：使用函数式或过程式编程简化项目，不依赖类的状态管理。

---

### 示例代码

#### 函数声明 vs 箭头函数

```typescript
function declaredFunction() {
  console.log("Function declaration");
}

const arrowFunction = (val: number) => val * 2;
```

#### 对象字面量与类

```typescript
// 对象字面量
const user = {
  name: "John",
  sayHello() {
    console.log(`Hello, ${this.name}`);
  },
};

// 类
class User {
  constructor(public name: string) {}
  sayHello() {
    console.log(`Hello, ${this.name}`);
  }
}
```

#### 使用接口和模块化脚本管理数据

```typescript
// User.ts
export interface IUser {
  name: string;
  age: number;
}

const User = {
  isValid(user: IUser): boolean {
    return !!user.name && user.age > 0;
  },
};

export default User;
```

---

### 总结

- **优先使用函数声明和对象字面量**，简化代码结构。
- **避免使用类组织项目或处理 IO 数据**，改用接口和模块化脚本。
- 遵循文件组织规则，确保代码可维护性和清晰性。
