const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});
app.use('/users', userRoutes);

module.exports = app;

            