const modueluers = require('../models/User/modulUser')
const moduel = require('../models/message/modulDiscussion')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        //Pour le destinataire 
        modueluers.findOneAndUpdate({"nom":doc.distinataire}, {$push :{discution: doc._id}},{new:true, runValidators:true})
        .then((doc)=>{
            moduel.findOneAndUpdate({"_id": doc.discution},{ $push : {users : doc._id}},{new:true, runValidators:true})
            .then((doc)=>{console.log("good2");})
            .catch((err)=>{console.error("error c11:"+err)}) 
      }) 
          .catch((err)=>console.error("error c1:"+err))

     //Pour l'envoyer     
        modueluers.findOneAndUpdate({"nom":req.params.nom}, {$push :{discution: doc._id}},{new:true, runValidators:true})
        .then((doc)=>{
          moduel.findOneAndUpdate({"_id": doc.discution},{ $push : {users : doc._id}},{new:true, runValidators:true})
          .then((doc)=>{console.log("good2"); res.send(doc);})
          .catch((err)=>{console.error("error c11:"+err)}) 
    }) 
        .catch((err)=>console.error("error c1:"+err))
    })
    .catch((err)=>console.error("error c:"+err))
}

function affiche(req, res){
    moduel.find().populate([{path:'message', select:['contenue']}, {path:"users", select :["nom", "prenom"]}])
    .then((doc)=>{
        res.send(doc)
      })
      .catch((err)=>console.error("error c:"+err))
}
function supp(req, res){

}


module.exports ={createDiscussion:create, affiDiscussion:affiche,suppDiscution:supp}