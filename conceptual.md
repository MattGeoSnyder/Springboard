### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?

  - The purpose of React Router is to help implement client side routing.

- What is a single page application?

  - A single page application loads only one web document and uses client side routing to display different content in that one document based on the url.

- What are some differences between client side and server side routing?

  Client side routing:

  1. Only one html document served, less data is usually processed between routes.
  2. Page is served by the browser instead of the server.
  3. No page refreshes

  Server side routing:

  1. A new html document is served by the server for each route.
  2. More data sent for each request
  3. Page refreshes

- What are two ways of handling redirects with React Router? When would you use each?

  1. We can render a `<Redirect />` element. Which does not add the previous page to the browsers history stack. Good if we want to redirect the user away from a particular page, say in the case that the url doesn't exist.

  2. We can mapipulate the browsers history stack with the useHistory hook. This is good if we want the user to be able to go back to the previous page.

- What are two different ways to handle page-not-found user experiences using React Router?

  1. We can render a `<Route />` element as the last element in a switch block. This will act as a catch all if no routes above are matched.

  2. We can force a redirect if a page is not found. This is typically better when we're working with url parameters.

- How do you grab URL parameters from within a component using React Router?

  - We can get url parameters from using the useParams hook in react router.

- What is context in React? When would you use it?

- Context allows information to be shared globally between components. One case where this is useful is when we find ourselves prop drilling, i.e. we are passing down props many layers to grandchildren and great-grandchildren elements of a component.

- Describe some differences between class-based components and function
  components in React.

  1. Obvious, but classed based components defined using javascript classes and function components are defined using functions
  2. There is a lot more set-up using class based components such as creating a contructor function and defining our class properties.
  3. When dealing with a class we have to be very conscientious with our usage of the _this_ keyword. In practice it often loses the context of our class.

- What are some of the problems that hooks were designed to solve?

  1. Hooks are easier to use and set up.
  2. Hooks reduce a lot of code duplication, it allows us to share functionality easily between components.
