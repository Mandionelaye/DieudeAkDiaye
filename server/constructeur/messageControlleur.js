const moduel = require('../models/message/message')
const conver = require('../models/Conversation/Conversation');

//add message
const create = async(req, res)=>{
     const newMessage = new moduel(req.body);
     try{
         newMessage.save()
        .then(async(doc)=>{
         conver.findOneAndUpdate({"_id":req.params.id}, {$push :{Messages: doc._id}},{new:true, runValidators:true})
         .then(async(doc)=>{
            console.log('cool');
         })
         .catch((err)=>{
            console.log(err);
         })
           const messages = await moduel.findById(doc._id).populate({path:"sender", select :["nom", "prenom", "photo"]})
         res.send(messages)
     })
     }catch (err){
      res.status(500).send(err);
     }
}
//get message
const affiche = async(req, res)=>{
      try{
         const messages = await moduel.find({conversationId : req.params.Id}).populate({path:"sender", select :["nom", "prenom", "photo"]});
         res.status(200).json(messages);
      }catch(err){
         res.status(500).send(err);
      }
}


module.exports ={createMessage:create,afficheMessage:affiche}