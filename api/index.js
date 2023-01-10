const express = require('express');
const morgan = require('morgan');
import router from './router/indexRouter'
import sequelize from './model/dataSource'
import { globalErrorHandler } from './utils/error'

const createApp = () => {
    const app = express();

    app.use(morgan("tiny"));
    app.use(express.json())
    app.use(express.urlencoded({limit : '300mb',parameterLimit : 100000, extended : true}))
    app.use(router)
    app.use(globalErrorHandler)
    
    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    })

    return app
}

const app = createApp();

try {
    sequelize.authenticate();
    console.log('Connection established seQuelize!');
} catch {
    console.error('Failed to connect to database:', error)
}



module.exports = {
    createApp,
    path: '/',
    handler: app
}