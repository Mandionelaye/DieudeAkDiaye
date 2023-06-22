const mongoose = require("mongoose");

const shematPanier = mongoose.Schema({
    users:[{type: mongoose.Types.ObjectId, ref: "user"}],
    ProduitsCommander:[{type: mongoose.Types.ObjectId, ref: "produit"}]
})

module.exports = mongoose.model("panier",shematPanier)