### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  1. We can use .then chaining. For example say we have a function: example().
     To handle asynchronous values, this function returns a promise.
     We can call the .then method to determine what we'd like to do once the promise is fulfilled.
     We can also call the .catch method to determine what we'd like to if the promise is not fulfilled.

     Example:

     ```js
     example()
       .then((value) => console.log(value))
       .catch(() => console.log("Promise not fulfilled"));
     ```

  2. We can store fulfilled promise value by using the await keyword. No, further code will run until this promise is fulfilled. We can wrap this in a try catch block in the instance that the promise is not fulfilled.

     Example:

     ```js
     try {
       let value = await example();
     } catch (error) {
       console.log("Promise not fulfilled :(");
     }
     ```

- What is a Promise?

  - A promise is an object respresenting the eventual completion of a an asynchronous operation and its value.

- What are the differences between an async function and a regular function?

  - An async function returns a promise. An async function does not necessarily complete its execution before going to the next line of code as opposed to a regular function.

- What is the difference between Node.js and Express.js?

  - The main difference between Node.js and Express.js is that Node.js runs outside of your web browser. As a result many of the DOM related methods and objects are not included in Node.js

- What is the error-first callback pattern?

  - The Error first callback pattern pertains to most of the standard modules included in Node.js. For functions in the standard modules that accept a callback function, the argument passed to the callback function is usually an error.

  An example is the readFile method:

  ```js
  fs.readFile(path, encoding, (error, data) => {
    if (erorr) {
      throw error;
    }

    console.log(data);
  });
  ```

- What is middleware?

  - Middleware are functions we'd like to call in the middle of the request/response cycle. Typically after the request and before the response.

  express.json() to parse the request body is an example:

  ```js
  const express = require('express');

  const app = express();

  app.use(express.json());

  app.post('/cats', (req, res, next) = > {
    // Do something with request.body
  });
  ```

  In the above code, if we make a request to /cats, app.use(express.json()) will run before the code inside the post route is executed, parsing the body of the request to JSON data.

- What does the `next` function do?

  - The `next` function tells the app to move on the next step in the request/response cycle.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```

Some improvements I would make would be:

1. Use string templating for the api calls, since there is a lot of repetition there.

2. Restructure the code so that the calls are made in parallel.

3. Make use of the Promise.all() method to wrap all the calls in one Promise.

```js
const BASE_URL = "https://api.github.com/users";

aysnc fucntion getUsers() {
  const elie = $.getJSON(`${BASE_URL}/elie`);
  const joel = $.getJSON(`${BASE_URL}/joelburton`);
  const matt = $.getJSON(`${BASE_URL}/mmmaaatttttt`);

  return Promise.all([elie, joel, matt]);
}
```
