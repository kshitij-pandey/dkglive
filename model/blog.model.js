const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bolgSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    imgUrl: {
        type: String
    },
    date: {
        type: String,
        // default: Date.now
    }
}, {
    timestamps: true
})

module.exports = Blog = mongoose.model('bolg', bolgSchema);