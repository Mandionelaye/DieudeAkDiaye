const express = require('express');
const {createUser,afficheUser,modifUser,suppProduitUser,conn} = require('../constructeur/userConstructeur');
const {createProduit,affiProduit} = require('../constructeur/produitsConstructeur');
const {createDiscussion,affiDiscussion,suppDiscution} = require('../constructeur/discutionControlleur');
const {createMessage,suppMessage} = require('../constructeur/messageControlleur');
const {createPanier,addProduit,affichPanier,suppProduit} = require('../constructeur/panierController');
const routes= express.Router();

//Pour les users
routes.post('/user', createUser);
routes.get("/users/:id", afficheUser)
routes.put("/user/modiff/:id", modifUser)
routes.put('/user/supp/:id', suppProduitUser)
routes.post("/connection", conn)



//Pour les Produits
routes.post('/produit/:id', createProduit);
routes.get("/produits", affiProduit)

//Pour les discussions
routes.post('/discution/:nom', createDiscussion);
routes.get("/discutions", affiDiscussion)
routes.put('/discution/supp', suppDiscution)

//Pour les discussions
routes.post('/messsage/:nom', createMessage);
routes.put('/message/supp', suppMessage)

//Pour les discussions
routes.post('/panier', createPanier);
routes.post("/panier/add/:nom", addProduit)
routes.delete("/panier/supp/:nom", suppProduit)
routes.get("/paniers", affichPanier)
module.exports = routes;