// require('dotenv').config();
// const app = require('./server');

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

const app = require('./server');

// Railway SEMPRE fornece process.env.PORT
// fallback 3000 só funciona localmente
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
