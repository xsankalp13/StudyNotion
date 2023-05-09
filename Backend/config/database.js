const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected');
    }
    )
    .catch((err) => {
        console.log('Database connection failed');
        console.log(err);
        process.exit(1);
    }
    );



}