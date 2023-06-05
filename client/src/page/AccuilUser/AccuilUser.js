import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode'
//import LogOut from '../../composent/deconnection/logOut';
import './accuilUser.css'
import Produits from './listeProduits/Produits';
export default function AccuilUser() {
  const user = localStorage.getItem("token");
    const idUser = jwt(user)
   const [dataUser, setDataUser] = useState(null)
   const categorys =[
    {
      id:1,
      name: "Jeux videos & Consoles",
      icone:"fa-solid fa-gamepad"
  },
    {
      id:2,
      name:"Boutique Officielles",
       icone:"fa-solid fa-shop"
    },
    {
      id:3,
      name:'Telephones & Tablettes',
       icone:"fa-solid fa-mobile-screen"
    },
    {
      id:4,
      name:'Electromenager',
       icone:"fa-solid fa-blender-phone"
    },
    {
      id:5,
      name:'Sante & Beaute',
       icone:"fa-solid fa-heart-pulse"
    },
    {
      id:6,
      name:'Informatique',
       icone:"fa-solid fa-laptop"
    },
    {
      id:7,
      name:'Mode',
       icone:"fa-solid fa-shirt"
    },
    {
      id:8,
      name:'Articles de Sport',
       icone:"fa-solid fa-dumbbell"
    },
    {
      id:9,
      name:'Autres Categories',
      icone:"fa-solid fa-ellipsis-vertical"
    }
 ]
    useEffect(()=>{
        const data= async ()=>{
            try{
       await axios.get("http://localhost:8000/users/"+idUser.data.id)
     .then((doc)=>{
        console.log(doc);
      setDataUser(doc.data)
     })
    }catch(err){
        console.log(err);
     }
    }
     data();
    },[dataUser, idUser])

  return (
        <div className='containerU'>
           <nav className="navs navbar navbar-light">
            <div className="container w-100">
              <p className='log'>2D <samp> Dieude ak Diaye</samp></p>
              <div className='icones d-flex'>
               <Link className="icone"><i class="fa-solid fa-house-user"></i></Link>
               <Link className="icone"><i class="fa-solid fa-cart-shopping"></i></Link>
               <Link className="icone"><i class="fa-solid fa-message"></i></Link>
             </div>
             <div className='divInput'>
                <input type="search" className='search' placeholder='Recherche produit'/> 
                <button className='bttn btn'><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>   
              <div className='profil'>
                <img src={dataUser?dataUser.photo:null} alt="Prfl" className='imgProfil' />
              </div>
            </div>
          </nav>
          <div className="container conte">
             <div className='Param'>
              <div className="profil">
               <div className="name">
               <img src={dataUser?dataUser.photo:null} className='imgProfi' alt="prfl" />
               <p>{dataUser?dataUser.prenom:null} {dataUser?dataUser.nom:null}</p>
               </div>
               <p className='entreP'><span><i class="fa-solid fa-city"></i></span> {dataUser?dataUser.nomEntreprise:"Nom entreprise"}</p>
               </div>
               <div className="categorys">
                <div className='ligneCate'></div>
                <h5>Categories</h5>
                  <ul className='category'>
                  {
                    categorys.map((category)=>(
                      <li key={category.id} className='liste'><i className={category.icone}></i>{category.name}</li>
                    ))
                  }
                </ul>
               </div>
             </div>
             <div className='Produits'>
             <div className='ajout'>
              <div className="form">
                <img src={dataUser?dataUser.photo:null} className='imgProfi' alt="prfl" />
                <input type="text" className='Ecrire' placeholder='ecrire...' />
              </div>
              <div className='button'>
                   <div className='itme1 im'>
                      <button className='btnt'> Ajouter<samp className='btn-ajout'><i className="fa-solid fa-plus"></i></samp></button>
                   </div>
                   <div className="span"></div>
                   <div className='itme1'>
                   <button className='btnt'> Photo<samp className='btn-photo'><i className="fa-solid fa-camera"></i></samp></button>
                   </div>
              </div>
              </div>
              <Produits categorys={dataUser?dataUser.categories:null}/>
             </div>
          </div>
        </div>
  )
}
