const mongoose = require("mongoose");

const shematMessage = mongoose.Schema({
    send:String,
    contenue:String,
    discussion:[{type: mongoose.Types.ObjectId, ref:"discussion"}],
},{ timestamps: true })

module.exports = mongoose.model('message',shematMessage)