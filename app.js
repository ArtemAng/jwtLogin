const express = require('express');
const config = require('config');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/usersList', require('./routes/users.routes'))


const start = async () => {
    try {
        
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('client/build'))
        }
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://aaa:aaa123@cluster0.nhuv4.mongodb.net/users?retryWrites=true&w=majority', {
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




// const express = require('express');
// const config = require('config');
// const mongoose = require('mongoose')

// const app = express();
// const PORT = process.env.PORT || 8888;

// app.use(express.json({ extended: true }))
// app.use('/api/auth', require('./routes/auth.routes.js'))
// app.use('/api/usersList', require('./routes/users.routes'))

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://aaa:aaa123@cluster0.nhuv4.mongodb.net/users?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
// }
// // const start = async () => {
// //     try {

        
// //     }
// //     catch (e) {
// //         console.log('server error', e.message);
// //         process.exit(1);
// //     }
// // }
// app.listen(PORT, () => console.log('App has been started'));
// // start();