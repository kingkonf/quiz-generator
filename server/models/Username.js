const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: String, 
   
    timestamp: Date, // Use the Date datatype for timestamps
})

const ContactModel = mongoose.model('username',UserSchema)
module.exports = ContactModel;
