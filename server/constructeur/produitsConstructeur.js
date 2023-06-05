const modueluers = require('../models/User/modulUser')
const moduel = require('../models/produit/modulProduit')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        modueluers.findOneAndUpdate({"_id":req.params.id}, {$push :{produits: doc._id}},{new:true, runValidators:true})
        .then((doc)=>{
          moduel.updateMany({"_id": doc.produits},{ $push : {users : doc._id, }},{new:true, runValidators:true})
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
    moduel.find().populate({path:"users", select :["nom", "prenom", "photo"]})
    .then((doc)=>{
        res.send(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}


module.exports ={createProduit:create, affiProduit:affiche}