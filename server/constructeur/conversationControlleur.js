
const moduel = require('../models/Conversation/Conversation');
const message = require('../models/message/message');
//new conversation

const newConversation = async(req, res) => {
    const {senderId, receverId} = req.body;
    const verconversation = await moduel.findOne({
      members:{$all:[senderId, receverId]}
     })
     if(!verconversation){
       const conversation = new moduel({
         members:[senderId, receverId],
         Messages:[]
        })
        try{
          const savedConversation = await conversation.save();
          
          res.status(200).json(savedConversation);
        }catch(err){
          res.status(500).json(err)
        }
      }else{
        res.status(200).json(verconversation);
      }
}

//get conversation of a user
const  affiche = async(req, res)=>{
   try{
     const conversation = await moduel.find({
        members:{$in:[req.params.userId]}
     }).populate([{path:"members", select :["nom", "prenom", "photo"]},
                 {path:"Messages", select :["sender"]}
    ]);
     res.status(200).json(conversation);
   }catch(err){
    res.status(500).json(err)
   }
}


const  filtre = async(req, res)=>{
  let tab = [];
  try{
    const conversation = await moduel.find({
       members:{$in:[req.params.userId]}
    }).populate([{path:"members", select :["nom", "prenom", "photo"]},
    {path:"Messages", select :["sender", "conversationId", "text"]}]);
    conversation.map((c)=> c.Messages.length?tab.push(...c.Messages):null)
    res.status(200).json(tab);
  }catch(err){
   res.status(500).json(err)
  }
}


// get conv includes two userId
const  getconversation = async(req, res)=>{
try{
   const conversation = await moduel.findOne({
    members:{$all:[req.params.firstuserId, req.params.secondUserId]}
   })
   res.status(200).json(conversation)
}catch(err){
    res.status(500).json(err)
}
}
const litMessage = async(req, res)=>{
  try{
    const conversation = await moduel.updateOne({"_id":req.params.id}, 
    {$pull : {Messages : req.body.id}},{new:true, runValidators:true})

    res.status(200).json(conversation);
 
  } catch(err){
    res.status(500).json(err)
}
}



module.exports ={createDiscussion:newConversation, affiDiscussion:affiche,getconversation:getconversation, litMessage:litMessage, filtre:filtre}