const express = require('express');
const {createUser,afficheUser,modifUser,suppProduitUser,conn,affiches,} = require('../constructeur/userConstructeur');
const {createProduit,affiProduit,afficheOne} = require('../constructeur/produitsConstructeur');
const {createDiscussion,affiDiscussion,getconversation, litMessage, filtre} = require('../constructeur/conversationControlleur');
const {createMessage,afficheMessage} = require('../constructeur/messageControlleur');
const {createPanier,addProduit,affichPanier,suppProduit, afficheNormal} = require('../constructeur/panierController');
const {search}= require('../constructeur/search')
const routes= express.Router();




//all users , all produits
routes.get("/All", search)



//Pour les users
routes.post('/user', createUser);
routes.get("/users/:id", afficheUser)
routes.get("/users", affiches)
routes.put("/user/modiff/:id", modifUser)
routes.put('/user/supp/:id', suppProduitUser)
routes.post("/connection", conn)



//Pour les Produits
routes.post('/produit/:id', createProduit);
routes.get("/produits", affiProduit)
routes.get("/produits/:idp", afficheOne)

//Pour les conversation
routes.post('/conversations', createDiscussion);
routes.get("/conversations/:userId", affiDiscussion)
routes.get("/filtre/:userId", filtre)
routes.put("/litMessage/:id", litMessage)
routes.get("/conversations/:firstuserId/:secondUserId", getconversation)

//Pour les messages
routes.post('/messsages/:id', createMessage);
routes.get('/message/:Id', afficheMessage)
//Pour le panier
routes.post('/panier/:id', createPanier);
routes.post("/panier/add/:id", addProduit)
routes.put("/panier/supp/:id", suppProduit)
routes.get("/paniers/:id", affichPanier)
routes.get("/panierNormal/:id", afficheNormal)
module.exports = routes;