const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('hgs', 'root', 'Sickomysql1!', {
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize