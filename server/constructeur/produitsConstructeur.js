const modueluers = require('../models/User/modulUser')
const moduel = require('../models/produit/modulProduit')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        modueluers.findOneAndUpdate({"nom":req.params.nom}, {$push :{produits: doc._id}},{new:true, runValidators:true})
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
    moduel.find().populate({path:"users", select :["nom", "prenom"]})
    .then((doc)=>{
        res.send(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}
function modif(req, res){

}
function supp(req, res){

}


module.exports ={createProduit:create, affiProduit:affiche, modifProduit:modif, suppProduit:supp}