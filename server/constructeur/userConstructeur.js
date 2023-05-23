const moduel = require('../models/User/modulUser')
const produits = require('../models/produit/modulProduit')
const Avatra = require("../photos/FunctionPhoto")

const avatar = ''
function create(req, res){
    const {nom , prenom, email, motsDePasse,entreprise, categories}=req.body;
    moduel.create({
        nom:nom,
        prenom:prenom,
        email:email,
        motsDePasse:motsDePasse,
        nomEntreprise:entreprise,
        photo:Avatra,
        categories:categories,
        bio:"",
    })
    .then((doc)=>{
     res.send(doc)
     console.log("good");
    })
    .catch((err)=>console.error("error c:"+err))
}

function affiche(req, res){
 moduel.find().populate([
    {path:'produits', select:['TypeDeCategorie','description', 'prix']}, 
    {path:"discution", select :["distinataire","message"]}, 
    {path:"panier", select :["ProduitsCommander"]}
])
 .then((doc)=>{
    res.send(doc)
   })
   .catch((err)=>console.error("error c:"+err))
}

//Modiff
function modif(req, res){
    const {nom , prenom, bio, photo,entreprise}=req.body;
    nom?
    moduel.updateOne({"nom":req.params.nom}, {nom:nom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp1");
      })
      .catch((err)=>console.error("error c1:"+err))
     :null

    //Prenom
    prenom?
    moduel.updateOne({"nom":req.params.nom}, {prenom:prenom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp2");
    })
    .catch((err)=>console.error("error c2:"+err))
    :null

    //Bio
    bio?
    moduel.updateOne({"nom":req.params.nom}, {bio:bio}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp3");
    })
    .catch((err)=>console.error("error c3:"+err))
    :null
    
    //Photo
    photo?
    moduel.updateOne({"nom":req.params.nom}, {photo:Avatra(photo)}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp4");
    })
    .catch((err)=>console.error("error c4:"+err))
    :null

     //nomEntreprise
     entreprise?
     moduel.updateOne({"nom":req.params.nom}, {nomEntreprise:entreprise}
     ,{new:true, runValidators:true})
     .then((doc)=>{
         res.send(doc)
         console.log("supp5");
     })
     .catch((err)=>console.error("error c5:"+err))
     :null
}
function suppProduit(req, res){
    moduel.updateOne({"nom":req.params.nom}, {$pull : {produits : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        produits.findByIdAndRemove(req.body.id)
        .then((doc)=>{console.log(doc);})
        .catch((err)=>console.error("error m:"+err))
        res.send(doc)
        console.log("supp");
      })
      .catch((err)=>console.error("error c:"+err))
}


module.exports ={createUser:create, afficheUser:affiche, modifUser:modif, suppProduitUser:suppProduit}