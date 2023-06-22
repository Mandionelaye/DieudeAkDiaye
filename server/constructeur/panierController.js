const modueluers = require('../models/User/modulUser')
const moduel = require('../models/Panier/panier')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        modueluers.findOneAndUpdate({"_id":req.params.id}, {$push :{panier: doc._id}},{new:true, runValidators:true})
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
    moduel.findById(req.params.id).populate([
      {path:"ProduitsCommander", select :['photoProduit','description', 'prix']},
      {path:"users", select :["nom", "prenom", "photo"]}])
    .then((doc)=>{
        res.send(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}

function addProduit(req, res){
    moduel.findOneAndUpdate({"_id":req.params.id}, {$push : {ProduitsCommander : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("modiff");
      })
      .catch((err)=>console.error("error c:"+err))
}

function suppProduit(req, res){
    moduel.updateOne({"_id":req.params.id}, {$pull : {ProduitsCommander : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        res.status(201).json({
          message: true,
        })
        console.log("supp");
      })
      .catch((err)=>console.error("error c:"+err))
}
function afficheNormal(req, res){
  moduel.findById(req.params.id)
  .then((doc)=>{
      res.send(doc)
    })
    .catch((err)=>console.error("error c:"+err))
}
module.exports ={createPanier:create , affichPanier:affiche, addProduit:addProduit, suppProduit:suppProduit, afficheNormal:afficheNormal}