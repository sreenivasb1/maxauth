const mongoose = require('mongoose')


const Schema = mongoose.Schema
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    //saltSecret: String
})








module.exports = mongoose.model('user', userSchema)