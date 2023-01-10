const express = require('express');
const app = express();
import router from './router/indexRouter'
import sequelize from './model/dataSource'

app.use(express.json())
app.use(express.urlencoded({limit : '300mb',parameterLimit : 100000, extended : true}))
app.use(router)

try {
    sequelize.authenticate();
    console.log('Connection established seQuelize!');
} catch {
    console.error('Failed to connect to database:', error)
}

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' })
})

module.exports = {
    path: '/',
    handler: app
}