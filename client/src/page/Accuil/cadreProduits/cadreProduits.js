import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './cadreProduits.css'
export default function CadreProduits({id}) {
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
      name: "electronique"},
     { tab : produits.filter((p)=> p.TypeDeCategorie==="jeux videos & consoles"),
      name: "jeux videos & consoles"},
      { tab : produits.filter((p)=> p.TypeDeCategorie==="animaux"),
      name: "animaux"},
      { tab : produits.filter((p)=> p.TypeDeCategorie==="alimentation générale"),
      name: "alimentation générale"},
      { tab : produits.filter((p)=> p.TypeDeCategorie==="vehicule"),
      name: "vehicule"},
    ]

    const lookProduit =(idProduit)=>{
      window.location = `${id?`/2D/${id}/`+idProduit:"/connecter/"+idProduit}`
    }
  return (
    <>
      <div className='cadreP'>
       <div className='row m'>
        {produits.length?(

            types.map((type)=>(
              <div className={'sport'} key={type.name}>
              <h1 className='titre'>{type.name}</h1>
              <div className= 'row prod'>
              {
                type.tab.map((produit)=>(
                  <div className="itmp col-2" key={produit._id} onClick={()=>{lookProduit(produit._id)}}>
                <div className="elmep">
                    <img className='imgPr' src={produit.photoProduit} alt=""/>
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
      ))
    ):
    <div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
  }
    </div>
      </div>
    </>
  )
}
