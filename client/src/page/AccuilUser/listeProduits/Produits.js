import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './produits.css'

export default function Produits({categorys}) {
  const [produits, setProduit]= useState([])
  useEffect(()=>{
      const DB= async()=>{
     await axios.get('http://localhost:8000/produits')
      .then((doc)=>{
         setProduit(doc.data)
      })
      .catch((err)=>{console.log(err);})
  }
  DB()
  })
  return (
    <div className='elmProduit'>
      {
        produits.map((produit)=>(
          <div className="eleme">
            <div className="user">
            <img src={produit.users[0].photo} alt="img" className='imgProfi' />
            <p>{produit.users[0].prenom} {produit.users[0].nom}</p>
            </div>
            <div className="descrip">
              <p>{produit.description}</p>
            </div>
            <img src={produit.photoProduit} className='imgPrdt' alt="prdt" />
            <div className="btnPrdt">
              <div className="itmePr"><p className="prix">{produit.prix} F</p></div>
              <div className="spane"></div>
              <div className="itmePr"><button className='btn btn-commd'>Commander</button></div>
              <div className="itmePr"><button className='btn btn-commd'>Discuter</button></div>
            </div>

          </div>
        ))
      }
    </div>
  )
}
