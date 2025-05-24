'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(path.resolve(__dirname, '..', 'config', 'config.js'))[env];
const config = require(path.resolve(__dirname, '..', 'config', 'config.js'));

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
   sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: false
  });
}

const initModels = require('./init-models');
const models = initModels(sequelize);
Object.assign(db, models);

db.Sequelize = Sequelize;

module.exports = db;
