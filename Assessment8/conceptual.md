### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?

  - React is a front-end library. It's good for breaking your front end code into reusable and functional chunks, or components.

- What is Babel?

  - Babel is a transpiler. It compiles code in one lanuage to another language. For example it compiles JSX into valid javascript.

- What is JSX?

  - JSX is a language that allows us to write HTML in Javascript.

- How is a Component created in React?

  - A component is created by defining a function that returns valid JSX code in React.

- What are some difference between state and props?

  1. Props are passed down from parent components whereas state variable may not necessarily be passed down.
  2. State variables are mutable and props are not mutable within child components.

- What does "downward data flow" refer to in React?

  - Downward dataflow refers to the fact that we try to save most of our data and state variables in higher order components and pass that down to the children.

- What is a controlled component?

  - A controlled component has it's behavior driven by information passwed down as props by a parent.

- What is an uncontrolled component?

  - On the other hand, an uncontrolled component has its behavior controlled by its own local state.

- What is the purpose of the `key` prop when rendering a list of components?

  - The key prop help React keep track of components when rendering many of them adjacently.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

  - An array index is a poor choice because the array index is something that is easily mutable and will change as we insert/delete items. The key is meant to be a way to uniquely identify a component.

- Describe useEffect. What use cases is it used for in React components?

  - useEffect runs a callback function depending on the change of a piece of state (if we list it as a dependency). It's useful because we might not want a function to run on every re-render. For example if we want to call set interval. If our component is re-rendering, then we will have many timers rendering causing a memory leak.

- What does useRef do? Does a change to a ref value cause a rerender of a component?

  - useRef allows us to keep a reference to a variable across re-renders. No changing a reference value does not trigger a re-render.

- When would you use a ref? When wouldn't you use one?

  - When to use one:

    1. If we'd like to store information between re-renders.

  - When not to use one:

    1. To store information in order to access the DOM directly.

- What is a custom hook in React? When would you want to write one?
