require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'cashforce_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'log_vazio',
    password: process.env.DB_PASSWORD || 'log_vazio',
    database: process.env.DB_NAME || 'log_vazio',
    host: process.env.DB_HOST || 'log_vazio',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  }
};

