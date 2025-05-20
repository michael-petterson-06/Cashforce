const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/order.routes');
const setupSwagger = require('./swagger');

app.use(cors());
app.use(express.json());
app.use(routes);
setupSwagger(app);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
