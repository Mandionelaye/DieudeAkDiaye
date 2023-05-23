const express = require('express');
const {createUser,afficheUser,modifUser,suppProduitUser} = require('../constructeur/userConstructeur');
const {createProduit,affiProduit,modifProduit} = require('../constructeur/produitsConstructeur');
const {createDiscussion,affiDiscussion,suppDiscution} = require('../constructeur/discutionControlleur');
const {createMessage,suppMessage} = require('../constructeur/messageControlleur');
const {createPanier,addProduit,affichPanier,suppProduit} = require('../constructeur/panierController');
const routes= express.Router();

//Pour les users
routes.post('/user', createUser);
routes.get("/users", afficheUser)
routes.put("/user/modiff/:nom", modifUser)
routes.put('/user/supp/:nom', suppProduitUser)

//Pour les Produits
routes.post('/produit/:nom', createProduit);
routes.get("/produits", affiProduit)
routes.put('/produit/modif', modifProduit)

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