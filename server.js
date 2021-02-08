const app = require('express')();

app.get('/', (req, res) => res.send("All rights reserved Ahmed Teck in Youtube ."));

module.exports = () => {
  app.listen(3000);
} 