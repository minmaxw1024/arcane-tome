---
title: React 19 有哪些变化 - 5
published_at: 2024-12-13T15:00:00.000Z
snippet: React V19 change log 解读.
---

这是另外一篇升级指南, 因为内容比较多, 先选择了最重要的 breaking changes, 以后再补充其他内容.

## 不兼容的更改

### 渲染中的错误不再重新抛出

在 React 的早期版本中，渲染中抛出的错误会被捕获并重新抛出。在开发模式下，还会记录到 `console.error`，导致重复的错误日志。

在 React 19 中，改进了错误处理方式以减少重复：

- **未捕获的错误**：未被 Error Boundary 捕获的错误会报告给 `window.reportError`。
- **已捕获的错误**：被 Error Boundary 捕获的错误会记录到 `console.error`。

如果您的生产环境依赖于错误被重新抛出进行错误报告，可能需要更新错误处理逻辑。可以通过 `createRoot` 和 `hydrateRoot` 提供的新方法实现：

```javascript
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // ... 记录错误报告
  },
  onCaughtError: (error, errorInfo) => {
    // ... 记录错误报告
  },
});
```

---

### 移除已弃用的 React API

#### 函数组件的 `propTypes` 和 `defaultProps`

`propTypes` 自 2017 年 4 月（v15.5.0）开始被废弃。在 React 19 中，React 包中不再包含 `propTypes` 检查，相关代码将被忽略。

`defaultProps` 也已从函数组件中移除，建议使用 ES6 默认参数代替。但类组件仍支持 `defaultProps`。

**迁移示例**：

```javascript
// 之前
import PropTypes from "prop-types";

function Heading({ text }) {
  return <h1>{text}</h1>;
}
Heading.propTypes = {
  text: PropTypes.string,
};
Heading.defaultProps = {
  text: "Hello, world!",
};

// 之后
interface Props {
  text?: string;
}
function Heading({ text = "Hello, world!" }: Props) {
  return <h1>{text}</h1>;
}
```

---

#### 移除旧版 Context API

旧版 Context（`contextTypes` 和 `getChildContext`）自 2018 年 10 月（v16.6.0）开始被废弃。在 React 19 中，这些 API 已被移除，建议迁移到新的 Context API：

```javascript
// 之前
import PropTypes from "prop-types";

class Parent extends React.Component {
  static childContextTypes = {
    foo: PropTypes.string.isRequired,
  };

  getChildContext() {
    return { foo: "bar" };
  }

  render() {
    return <Child />;
  }
}

class Child extends React.Component {
  static contextTypes = {
    foo: PropTypes.string.isRequired,
  };

  render() {
    return <div>{this.context.foo}</div>;
  }
}

// 之后
const FooContext = React.createContext();

class Parent extends React.Component {
  render() {
    return (
      <FooContext.Provider value="bar">
        <Child />
      </FooContext.Provider>
    );
  }
}

class Child extends React.Component {
  static contextType = FooContext;

  render() {
    return <div>{this.context}</div>;
  }
}
```

---

#### 移除字符串 refs

字符串 refs 自 2018 年 3 月（v16.3.0）开始被废弃。在 React 19 中，字符串 refs 已被移除。建议迁移到回调 refs：

```javascript
// 之前
class MyComponent extends React.Component {
  componentDidMount() {
    this.refs.input.focus();
  }

  render() {
    return <input ref="input" />;
  }
}

// 之后
class MyComponent extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return <input ref={(input) => (this.input = input)} />;
  }
}
```

---

#### 移除模块模式工厂

模块模式工厂自 2019 年 8 月（v16.9.0）开始被废弃。在 React 19 中，已不再支持模块模式工厂，建议迁移到常规函数：

```javascript
// 之前
function FactoryComponent() {
  return {
    render() {
      return <div />;
    },
  };
}

// 之后
function FactoryComponent() {
  return <div />;
}
```

---

#### 移除 `React.createFactory`

`createFactory` 自 2020 年 2 月（v16.13.0）开始被废弃。在 React 19 中已移除，建议迁移到 JSX：

```javascript
// 之前
import { createFactory } from "react";

const button = createFactory("button");

// 之后
const button = <button />;
```

---

#### 移除 React Test Renderer 的浅渲染支持

在 React 18 中，`react-test-renderer/shallow` 已被更新为重新导出 `react-shallow-renderer`。在 React 19 中，直接移除浅渲染，建议直接安装该包：

```bash
npm install react-shallow-renderer --save-dev
```

```javascript
// 之前
import ShallowRenderer from "react-test-renderer/shallow";

// 之后
import ShallowRenderer from "react-shallow-renderer";
```

建议将测试迁移到 `@testing-library/react` 或 `@testing-library/react-native`。

---

#### 移除 React DOM 的旧 API

- **移除 `ReactDOM.render`**：
  - React 19 移除了 `ReactDOM.render`，需要迁移到 `ReactDOM.createRoot`。

```javascript
// 之前
import { render } from "react-dom";
render(<App />, document.getElementById("root"));

// 之后
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

- **移除 `ReactDOM.hydrate`**：
  - React 19 移除了 `ReactDOM.hydrate`，需要迁移到 `ReactDOM.hydrateRoot`。

```javascript
// 之前
import { hydrate } from "react-dom";
hydrate(<App />, document.getElementById("root"));

// 之后
import { hydrateRoot } from "react-dom/client";
hydrateRoot(document.getElementById("root"), <App />);
```

- **移除 `unmountComponentAtNode`**：
  - React 19 移除了 `unmountComponentAtNode`，需要迁移到 `root.unmount()`。

```javascript
// 之前
unmountComponentAtNode(document.getElementById("root"));

// 之后
root.unmount();
```

- **移除 `ReactDOM.findDOMNode`**：
  - React 19 移除了 `findDOMNode`，建议迁移到 DOM refs：

```javascript
// 之前
import { findDOMNode } from "react-dom";

function AutoselectingInput() {
  useEffect(() => {
    const input = findDOMNode(this);
    input.select();
  }, []);

  return <input defaultValue="Hello" />;
}

// 之后
function AutoselectingInput() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.select();
  }, []);

  return <input ref={ref} defaultValue="Hello" />;
}
```
