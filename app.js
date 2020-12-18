const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/usersList', require('./routes/users.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'))
}

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
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