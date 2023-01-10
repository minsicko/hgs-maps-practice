const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('hgs', 'root', 'Sickomysql1!', {
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize