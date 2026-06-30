const express = require('express');
const proxyHandler = require('./react.js');

const app = express();

app.use((req, res) => {
  proxyHandler(req, res);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});