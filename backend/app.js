//imports
    const express = require('express')
    const mongoose = require('mongoose')
    const requireDir = require('require-dir')
    const cors = require('cors')

    const routes = require('./routes.js')

//app and middlewares
    const app = express()
    app.use(express.json())
    app.use(cors())

//DB config
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.Promise = global.Promise
    mongoose.connect(
        'mongodb://localhost:27017/apiNode', { useNewUrlParser: true, useUnifiedTopology: true })
    requireDir('./src/models')

//routes
    app.use(routes)

//not found
    app.get('*', (req, res) => {
        res.status(404).json({ status: 404, message: 'Page Not Found' })
    })

//PORT
    const PORT = 8054
    app.listen(PORT, () => console.log(PORT))