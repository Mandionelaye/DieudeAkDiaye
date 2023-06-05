const experss = require("express")
require('dotenv').config();
const bodyParser = require("body-parser");
const bd = require("./BasedeDonne/bd");
const route  = require("./Route/router");
const cors = require("cors")
const port = process.env.PORT || 8000
bd.connect();
// Initialisation de l'application Express
const app = experss()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(route);
app.listen(port, ()=>console.log("http://localhost:"+port));