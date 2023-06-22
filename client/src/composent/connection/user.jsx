
import axios from 'axios';

function User(id) {
    try{
    axios.get("http://localhost:8000/users/"+id)
   .then((doc)=>{
   const datas=doc.data
   return ({datas});
   })
  }catch(err){
      console.log(err);
   }
 
}

module.exports = User;