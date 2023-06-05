import React, { useState } from 'react'
import axios from 'axios'
import "./createUser.css"

export default function CreateUser() {
    const [reponse, setReponse]= useState(null);
    const [error, setError]= useState(''); 
    const [nom, setNom]= useState();
    const [prenom, setPrenom]= useState();
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();
    const [isAdmin, setIsAdmin]= useState();
    const [categories, setCategories]= useState([]);
    function inputNom(e){ setNom(e.target.value); }
    function inputPrenom(e){ setPrenom(e.target.value); }
    function inputEmail(e){ setEmail(e.target.value); }
    function inputPassword(e){ setPassword(e.target.value); }
    function inputIsAdmin(e){ setIsAdmin(e.target.value); }
    function inputCategorie(e){ 
        setCategories([...categories, e.target.value]);
    }
    const inputs = [
        {
            id:1,
            labeel:"Nom",
            type:"text",
            placeholder:'nom',
            value:nom,
            function:inputNom,
        },
        {
            id:2,
            labeel:"Prenom",
            type:"text",
            value:prenom,
            placeholder:'prenom',
            function:inputPrenom,
        },
        {
            id:3,
            labeel:"email",
            type:"email",
            value:email,
            placeholder:'email',
            function:inputEmail,
        },
        {
            id:4,
            labeel:"Mots de passe",
            type:"password",
            value:password,
            placeholder:'mots de passe',
            function:inputPassword,
        },
    ]
    const categorys =[
        {
            id:1,
            name: "",
            icone:"fa-solid fa-gamepad"
        },
        {
          id:2,
          name: "Jeux videos & Consoles",
          icone:"fa-solid fa-gamepad"
      },
        {
          id:3,
          name:"Boutique Officielles",
           icone:"fa-solid fa-shop"
        },
        {
          id:4,
          name:'Telephones & Tablettes',
           icone:"fa-solid fa-mobile-screen"
        },
        {
          id:5,
          name:'Electromenager',
           icone:"fa-solid fa-blender-phone"
        },
        {
          id:6,
          name:'Sante & Beaute',
           icone:"fa-solid fa-heart-pulse"
        },
        {
          id:7,
          name:'Informatique',
           icone:"fa-solid fa-laptop"
        },
        {
          id:8,
          name:'Mode',
           icone:"fa-solid fa-shirt"
        },
        {
          id:9,
          name:'Articles de Sport',
           icone:"fa-solid fa-dumbbell"
        },
     ]
    function envoi(e){
        e.preventDefault();
        axios.post('http://localhost:8000/user',{nom:nom, prenom:prenom, email:email, password:password, isAdmin:isAdmin, categories:categories})
        .then((res)=>{
              setReponse(res.data);
              setNom('');
              setPrenom('');
              setEmail('');
              setPassword('');
              setIsAdmin('');
              setCategories([]);
              setError(true)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
console.log(categories);
  return (
    <div className='pt-5'> 
    <div className=' containeC'>
      <h2>2D</h2>
      <p>Diaye ak Dieude</p>
        {error?reponse?<h3 className='text-center text-success'>reponse.message</h3>:<h3 className='text-center text-danger'>error de creartion veiller resssayer</h3>:null}
     <form  onSubmit={envoi} className='w-50 m-auto pt-5 pb-5' >
      {
        inputs.map((input)=>(
            <div className='mb-3' key={input.id} >
            <label form={input.labeel} className='form-label'>{input.labeel}</label>
            <input type={input.type} placeholder={input.placeholder} value={input.value} required className='form-control' onChange={input.function}/>
            </div>
        ))
      }
       <label form={"categoie"} className='form-label'>Categorie</label>
       {categories?<ul>{categories.map((categorie)=>(<li>{categorie}</li>))}</ul>:null}
        <select name="categorye" value={categories} className='mb-3 form-select'  onChange={inputCategorie}>
         {
            categorys.map((category)=>(
                <option key={category.id} value={category.name}>{category.name}</option>
            ))
         }
        </select>
        <label form={"admin"} className='form-label'>Admin</label>
        <select name="isdamin"className='mb-3 form-select' value={isAdmin}  onChange={inputIsAdmin}>
            <option value=''></option>
            <option value={false}>Acheteur</option>
            <option value={true}>Vendeur</option>
        </select>

        <input type="submit" value="creer" className='botn btn btn-primary' />
     </form>
     </div>
    </div>
  )
}
