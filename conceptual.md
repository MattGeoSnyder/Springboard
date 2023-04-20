### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

  - A JWT is a JSON Web Token.

- What is the signature portion of the JWT? What does it do?

  - The signature portion is an encoded secret key and it verifies that the request is coming from a valid source.

- If a JWT is intercepted, can the attacker see what's inside the payload?

  - Yes, the encryption type is given in the header of the JWT, so
    an interceptor could reverse the encryption to see what's in the
    payload.

- How can you implement authentication with a JWT? Describe how it works at a high level.

  - We can implement authentication by sending a JWT as a response to a particular request (valid registration/login). The token includes
    our secret key encoded in the signature, so subsequent requests will require verification that signature that we give the user.

- Compare and contrast unit, integration and end-to-end tests.

  1. Unit tests only test a particular function of an app.

  2. Integration tests test how those units interact with each
     other.

  3. End-to-end tests, go beyond integration tests and even test the front end of a webpage.

- What is a mock? What are some things you would mock?

  - A mock is simulating some other part of our app. Usually used in unit testing, a mock can make testing faster so we don't have to rely on some other part of the or something external.

- What is continuous integration?

  - Continuous integration tests code before it's merged into some kind of version control platform.

- What is an environment variable and what are they used for?

  - Environment variables configure the app that is running. For instance, we can change an environment variable to configure
    which database we connect to during testing.

- What is TDD? What are some benefits and drawbacks?

  - TDD is test driven development, which means that tests are written first and then code is written to pass those tests.

  Benefits:

  - Forces planning and good design architechture

  Drawbacks:

  - Makes development slower

- What is the value of using JSONSchema for validation?

  - JSONSchema makes validating user input much easier and faster.

- What are some ways to decide which code to test?

  - We want to test the code that we are testing as much as possible (that doesn't sound quite right). For example, if we make a request that creates something in our database, instead of querying the database directly, we can request another route to check that the database is updated.

- What does `RETURNING` do in SQL? When would you use it?

  - `RETURNING` returns specified values on SQL Queries. This is useful for CRUD operations, where, for example, we might want the primary key of the entry we just changed.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

  - I like both. It's kind of hard to say since we really didn't build a full app with express, but overall I think flask is easier to debug. However, I like javascript a lot more when dealing with Objects versus python dictionaries.
