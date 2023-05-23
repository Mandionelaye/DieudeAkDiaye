const modueluers = require('../models/message/modulDiscussion')
const moduel = require('../models/message/modulMessage')
function create(req, res){
    moduel.create(req.body)
    .then((doc)=>{
        modueluers.findOneAndUpdate({"distinataire":req.params.nom}, {$push :{message: doc._id}},{new:true, runValidators:true})
        .then((doc)=>{
          moduel.updateMany({"_id": doc.message},{ $push : {discussion : doc._id, }},{new:true, runValidators:true})
          .then((doc)=>{
            console.log("good2");
            res.send(doc)
        })
          .catch((err)=>{console.error("error c11:"+err)}) 
    }) 
        .catch((err)=>console.error("error c1:"+err))
    })
    .catch((err)=>console.error("error c:"+err))
}

function supp(req, res){

}


module.exports ={createMessage:create,suppMessage:supp}