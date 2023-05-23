const mongoose = require("mongoose");

const shematDicussion = mongoose.Schema({
    distinataire:String,
    message:[{type: mongoose.Types.ObjectId, ref:"message"}],
   users:[{type: mongoose.Types.ObjectId, ref:"user"}], 
},{ timestamps: true});

module.exports = mongoose.model("discussion",shematDicussion)