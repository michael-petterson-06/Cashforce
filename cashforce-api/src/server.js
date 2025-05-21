const express = require('express');
const cors = require('cors');
const routes = require('./routes/order.routes');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
setupSwagger(app);

module.exports = app;
