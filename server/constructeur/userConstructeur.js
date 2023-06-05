const moduel = require('../models/User/modulUser')
const produits = require('../models/produit/modulProduit')
const Avatra = require("../photos/FunctionPhoto")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (id, nom, isAdmin)=>{
    return jwt.sign({
        data:{id, nom, isAdmin}},
        process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
}

const create=async(req, res)=>{
    const {nom , prenom, email, password,entreprise, categories, isAdmin}=req.body;
    const salt =bcrypt.genSaltSync(10);
    const cryptPassword = bcrypt.hashSync(password, salt);
    const doc = await moduel.create({
        nom:nom,
        prenom:prenom,
        email:email,
        password:cryptPassword,
        nomEntreprise:entreprise,
        photo:Avatra,
        categories:categories,
        isAdmin:isAdmin,
        bio:"",
    })
    const token = createToken(doc._id, doc.nom, doc.isAdmin)
    return res.status(201).json({
        message: "User created successfully",
        token
     })
}

const connextion= async(req, res)=>{
    const {email, password} = req.body;
     await moduel.findOne({email : email}) 
     .then((doc)=>{
        if(!doc){
            return res.status(401).json({
                message:`votre Email: ${email} est non Valide`
            })
        }
        const comparePassword = bcrypt.compareSync(password, doc.password);
        if(!comparePassword){
            return res.status(401).json({
                message: "Mot de passe incorrect!"
            })
        }

        const token = createToken(doc._id, doc.nom, doc.isAdmin)
        return res.status(200).json({
            nom:doc.nom, 
            token,
        })
     })
}
 
function affiche(req, res){
    const id = req.params.id
 moduel.findById(id).populate([
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
    moduel.updateOne({"_id":req.params.id}, {nom:nom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp1");
      })
      .catch((err)=>console.error("error c1:"+err))
     :null

    //Prenom
    prenom?
    moduel.updateOne({"_id":req.params.id}, {prenom:prenom}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp2");
    })
    .catch((err)=>console.error("error c2:"+err))
    :null

    //Bio
    bio?
    moduel.updateOne({"_id":req.params.id}, {bio:bio}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp3");
    })
    .catch((err)=>console.error("error c3:"+err))
    :null
    
    //Photo
    photo?
    moduel.updateOne({"_id":req.params.id}, {photo:Avatra(photo)}
    ,{new:true, runValidators:true})
    .then((doc)=>{
        res.send(doc)
        console.log("supp4");
    })
    .catch((err)=>console.error("error c4:"+err))
    :null

     //nomEntreprise
     entreprise?
     moduel.updateOne({"_id":req.params.id}, {nomEntreprise:entreprise}
     ,{new:true, runValidators:true})
     .then((doc)=>{
         res.send(doc)
         console.log("supp5");
     })
     .catch((err)=>console.error("error c5:"+err))
     :null
}
function suppProduit(req, res){
    moduel.updateOne({"_id":req.params.id}, {$pull : {produits : req.body.id}},{new:true, runValidators:true})
    .then((doc)=>{
        produits.findByIdAndRemove(req.body.id)
        .then((doc)=>{console.log(doc);})
        .catch((err)=>console.error("error m:"+err))
        res.send(doc)
        console.log("supp");
      })
      .catch((err)=>console.error("error c:"+err))
}


module.exports ={createUser:create, afficheUser:affiche, modifUser:modif, suppProduitUser:suppProduit, conn:connextion}