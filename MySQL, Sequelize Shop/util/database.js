const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', "node-complete", {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; 