---
title: Relearn React 12
published_at: 2024-11-27T15:00:00.000Z
snippet: Relearning React from react.dev, yes, arrays.
---

## From "Choosing the State Structure"

### Principles of structuring state

#### Group related state.

```jsx
// Bad

const [name, setName] = useState("Alice Smith");
const [age, setAge] = useState(42);

// Good(it depends)
const [user, setUser] = useState({ name: "Alice Smith", age: 42 });
```

#### Avoid contradictions in state

```jsx
// Bad
const [isToggled, setIsToggled] = useState(false);
const [isDisabled, setIsDisabled] = useState(true);
```

#### Avoid redundant state

```jsx
// Image a user object is a props from parent component
const user = {
  firstName: "John",
  lastName: "Doe",
  birthYear: 1990,
};

// Derive these values instead of storing them as state
const fullName = `${user.firstName} ${user.lastName}`;
const age = new Date().getFullYear() - user.birthYear;
const canVote = age >= 18;
```

#### Avoid duplication in state

```jsx
// BAD: Duplicated state
const [cart, setCart] = useState([
  {
    id: "p1",
    name: "Laptop", // Duplicated from products
    price: 999.99, // Duplicated from products
    quantity: 1,
    totalPrice: 999.99, // Redundant - can be calculated
  },
  // ... more items with duplicated data
]);
```

#### Avoid deeply nested state

```jsx

// BAD: Deeply nested state
const [projects, setProjects] = useState({
  p1: {
    tasks: {
      t1: {
        subtasks: {
          s1: { title: "Task 1", completed: false },
        },
      },
    },
  },
});

// GOOD: Flattened state
const [projects, setProjects] = useState({...});
const [tasks, setTasks] = useState({...});
const [subtasks, setSubtasks] = useState({...});

```

## Pitfalls

### Update object in state

Directly mutating an state object didn't trigger a re-render. The better way is to create a new object with the updated values.

## Deep Dive


## References

- [Normalization in Database](https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description)
