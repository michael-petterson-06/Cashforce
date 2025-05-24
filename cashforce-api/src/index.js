const app = require('./server');

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
