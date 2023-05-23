const modueluers = require('../models/User/modulUser')
const moduel = require('../models/Panier/panier')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        modueluers.findOneAndUpdate({"nom":doc.user}, {$push :{panier: doc._id}},{new:true, runValidators:true})
        .then((doc)=>{
          moduel.updateMany({"_id": doc.panier},{ $push : {users : doc._id, }},{new:true, runValidators:true})
          .then((doc)=>{
            console.log("good2"); 
            res.send(doc);
        })
          .catch((err)=>{console.error("error c11:"+err)}) 
    }) 
        .catch((err)=>console.error("error c1:"+err))
    })
    .catch((err)=>console.error("error c:"+err))
}

function affiche(req, res){
    moduel.find().populate({path:"ProduitsCommander", select :["description", "prix"]})
    .then((doc)=>{
        res.send(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}

function addProduit(req, res){
    moduel.findOneAndUpdate({"user":req.params.nom}, {$push : {ProduitsCommander : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("modiff");
      })
      .catch((err)=>console.error("error c:"+err))
}

function suppProduit(req, res){
    moduel.updateOne({"user":req.params.nom}, {$pull : {ProduitsCommander : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp");
      })
      .catch((err)=>console.error("error c:"+err))
}

module.exports ={createPanier:create , affichPanier:affiche, addProduit:addProduit, suppProduit:suppProduit}