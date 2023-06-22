const moduel = require('../models/User/modulUser');
const produits = require('../models/produit/modulProduit');



const search = async(req, res) =>{
    const {Search}= req.query;
     try{
        const resUse= await moduel.find()
        const resPr= await produits.find()
        const all = await [...resUse, ...resPr]
        res.status(200).json(all)
     } catch(err){
         res.status(500).send(err)
     }
}



module.exports ={search: search};