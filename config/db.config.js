const mongoose = require('mongoose');
const config = require('./config');


const connectDB = () => {
    mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('mongoDb connected!'));
}

module.exports = connectDB;