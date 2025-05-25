const express = require('express');
const cors = require('cors');

const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const setupSwagger = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use(orderRoutes);
app.use(userRoutes);

setupSwagger(app);

module.exports = app;
