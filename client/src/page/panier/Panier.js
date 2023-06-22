import React, { useEffect, useState } from 'react'
import Header from '../AccuilUser/navUser/Header'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './panier.css';

export default function Panier() {
    const param = useParams()
    const [panierUser, setPanierUser] = useState(null);
    const [idpanier, setIdpanier] = useState('');
    const [imgUsers, setImgUsers] = useState('');
    const [somme, setSomme] = useState([]);
    useEffect(()=>{
        const data=async()=>{
            try{
      await axios.get("http://localhost:8000/users/"+param.id)
     .then((doc)=>{
      const data = doc.data;
      const panier = data.panier[0]
      setImgUsers(data.photo);
      setIdpanier(panier._id);
      if(panier){
      axios.get('http://localhost:8000/paniers/'+panier._id)
        .then((doc)=>{
          const data = doc.data;
            setPanierUser(data.ProduitsCommander)
        })
      }
     })
    }catch(err){
        console.log(err);
     }
    }
    if(!idpanier){
      data();
    }
  
    setSomme(panierUser?.map((elm)=>elm.prix))
    },[param, panierUser,idpanier])
    const deleteP=async(id)=>{
        if(idpanier){
      try{
       await axios.put('http://localhost:8000/panier/supp/'+idpanier, {id:id})
      }catch(err){
        console.log(err);
     }
     setPanierUser(panierUser.filter((elm)=> elm._id !== id))
    }
    }
  return (
    <div className='container-panier'>
      <Header photo={imgUsers}/>
     <div className='corpsP'>
      <div className="elmp">
        <div className="headerP">
          <div className="itmesp">
          <p className="titrep">Panier</p>
          </div>
          <div className="itmesp">
         <Link to={"/2D/"+param.id} ><button className='btn btn-addP'><i class="fa-solid fa-plus"></i></button></Link>
          </div>
          <div className="itmesp">
            <p className='somme'>{somme?somme.length<=1?somme:somme.reduce((accumulator, curr) => accumulator + curr):"0"} F</p>
          </div>
        </div>
        <div className='mart row'>
        {panierUser?(
                panierUser.length?(
                    panierUser.map((produit)=>(
                        <div className="etims col-1 m-3" key={produit._id}>
                            <img src={produit.photoProduit} alt="img" className='img-produit' />
                            <div className="part p-2">
                                <h4>{produit.description}</h4>
                                <div className="souspart d-flex justify-content-between">
                                <p>{produit.prix} F</p> 
                                <button type="button" className='btn btn-sm btn-delete' onClick={()=>{deleteP(produit._id)}}><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    ))
                ):
                <div className='panierVide'>
                     <div className="videfond">
                     <i class="fa-solid fa-cart-shopping fa-bounce"></i>
                     </div>
                     <p>Votre panier est vide allez commander</p>  
                </div>
        ):
          <div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
        }
          </div>
        </div>
     </div>
     <div className="footerm">
     <p>© 2023 Copyright: 2D Dieude ak Diaye </p>
      </div> 
    </div>
  )
}
