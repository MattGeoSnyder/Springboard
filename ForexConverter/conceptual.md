### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

  In web development, Python is used to deal with data on the backend of a website whereas JavaScript is used on the front end to make interactive webpages.

- Given a dictionary like `{"a": 1, "b": 2}`: , list two ways you
  can try to get a missing key (like "c") _without_ your programming
  crashing.

  You can use the .get method or you can use a try/except block to except a KeyError

- What is a unit test?

  A unit test is tests one part of your code such as a single function

- What is an integration test?

  An integration test tests multple sections of code that perform some larger function, i.e. testing multiple functions to make sure that an app route is working as intended.

- What is the role of web application framework, like Flask?

  The role of a web application framework is to make many aspects of web development easier. Some examples are handling web requests, producing dynamic HTML, handling forms and cookies, etc.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

  A parameter in a route URL is more integral to the subject of the page, whereas a query parameter is more like additional information to the page.

- How do you collect data from a URL placeholder parameter using Flask?

  We have something like:

  @app.route(/<query_parameter>)
  def do_stuff_at_route(query_parameter)

- How do you collect data from the query string using Flask?

  First we have to import the request variable from Flask. request.args acts like a dictionary, so we can get arguments from it like
  request.args['key_name']

- How do you collect data from the body of the request using Flask?

  You can collect data from request.data or request.get_data()

- What is a cookie and what kinds of things are they commonly used for?

  Cookies are key value pairs stored for a user in the web browser. These cookies are often sent to a server as additional information for the particular user.

- What is the session object in Flask?

  The session object is an Immutable multi-dict. They contain info for the current browser

- What does Flask's `jsonify()` do?

  jsonify converts certain python objects into json text.
