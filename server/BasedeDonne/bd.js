const mongoss = require("mongoose");
require("dotenv").config();

class BD{
    constructor(){
        return this.connect()
    }
    connect(){
        mongoss.connect(process.env.MONGO_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
        }).then(()=>{
            console.log("connection etablie");
        })
        .catch((err)=>console.error("error w:"+err))
    }
}

module.exports= new BD();