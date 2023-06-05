import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './cadreProduits.css'
export default function CadreProduits() {
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
    const listeproduits =[ {
      id:1,
      description:'une motre de luxe',
      img:"/image/motre.jpg",
      prix:15000
    },
    {
      id:2,
      description:"Air-force Noir",
       img:"/image/airforce_.jpg",
       prix:10000
    },
    {
      id:3,
      description:'Ipad pro 4',
       img:"/image/tablette.webp",
       prix:200000
    },
    {
      id:4,
      description:'Lunette de vue de loin',
       img:"/image/lunette.jpg",
       prix:10000
    },
    {
      id:5,
      description:'casque bluetooth',
       img:"/image/casque.jpg",
       prix:7000
    }]
    const types =[
    { tab :produits.filter((p)=> p.TypeDeCategorie==="sport"),
      name: "sport"},
    { tab : produits.filter((p)=> p.TypeDeCategorie==="pour enfant"),
      name:"pour_enfant"},
    { tab : produits.filter((p)=> p.TypeDeCategorie==="mode"),
      name: "mode"},
    { tab : produits.filter((p)=> p.TypeDeCategorie==="electromenager"),
      name:"electromenager"},
    { tab : produits.filter((p)=> p.TypeDeCategorie==="sante & beaute"),
      name: "sante & beaute"},
    { tab : produits.filter((p)=> p.TypeDeCategorie==="electronique"),
      name: "electronique"}
    ]
  return (
    <>
      <div className='cadreP'>
       <div className='row m'>

      {
        types.map((type)=>(
          <div className={'sport col-4'} key={type.name}>
                <h1 className='titre'>{type.name}</h1>
                <div className='prod'>
       {
        type.tab.slice(-3).map((produit)=>(
            <div className="elmPr" key={produit._id}>
                <div className="item">
                    <img className='imgP' src={produit.photoProduit} alt=""/>
                    <p>{produit.prix} F</p>
                </div>
            </div>
        ))
       }
       </div>
          </div>
        ))
      }
      </div>
      </div>
      <div className="containep">
        <div className="mer row">
       {
        listeproduits.map((produit)=>(
          <div className="itmp col-2" key={produit.id}>
              <div className="elmep">
               <img src={produit.img} className='imgPr' alt="img" />
               <div className='text'>
               <h3 className='desc'>{produit.description}</h3>
               <p>{produit.prix} F</p>
               </div>
               </div>
          </div>
        ))
       }
        </div>
      </div>
    </>
  )
}
