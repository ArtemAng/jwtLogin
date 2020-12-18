const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/usersList', require('./routes/users.routes'))
const PORT = config.get('port') || 8888;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log('App has been started'));

    }
    catch (e) {
        console.log('server error', e.message);
        process.exit(1);
    }
}

start();