const express = require('express');
let axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(async (d) => {
      // Not entirely sure why this doesn't return the fulfilled Promise
      // to the array.
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(out);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status).send(err.msg);
})

app.listen(3000);
