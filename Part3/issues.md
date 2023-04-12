# Broken App Issues

1. Include:
    ```js
    app.use(express.json())
    ```
    to parse request body as JSON.

2. Include async keyword in front of callback for route and wrap Promise.all() around results to get promises to fulfill before next line.

    ```js
    let results = await Promise.all(req.body.developers.map(async (d) => {
        return await axios.get(`https://api.github.com/users/${d}`)
    }));
    ```

3. Replace
    ```js
    JSON.strifify(out) 
    ```
    with
    ```js
    out
    ```
    since it's unnecessary. res.send() will determine it's json.

3. Add (err) to catch block and add
    ```js
    app.use((err, req, res, next) => {
        res.status(err.status).send(err.msg);
    })
    ```
    to end catch error.