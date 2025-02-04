const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/usersList', require('./routes/users.routes'))

mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://Artem:aaa123@cluster0.qj5z6.mongodb.net/app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('aaaaaaaaaaaaaa');
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get('/*', function(req, res) {
    res.redirect('..')
  })

app.listen(PORT, () => console.log('App has been started'));

