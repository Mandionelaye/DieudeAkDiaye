import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './produits.css';
import io from "socket.io-client"
import { useParams } from 'react-router-dom';

export default function Produits({idpanier, filtreCa}) {
  const [produits, setProduit]= useState([]);
  const parm = useParams();
  const socket= useRef();

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");

  },[]);
  useEffect(()=>{
      const DB= async()=>{
     await axios.get('http://localhost:8000/produits')
      .then((doc)=>{
        let datatb = doc.data
         setProduit(datatb.reverse())
      })
      .catch((err)=>{console.log(err);})
  }
  const DBone= async()=>{
    await axios.get('http://localhost:8000/produits/'+parm.idp)
     .then((doc)=>{
        setProduit([doc.data])
     })
     .catch((err)=>{console.log(err);})
 }
  if(parm.idp){
    DBone();
  }else{
    DB();
  }
  },[parm])

  //ajout d'un produit dans le panier
  const addPrdtPanier=async(user)=>{
    const {id, idUser} = user;
    if(idUser!== parm.id){

      if(idpanier){
        await axios.post('http://localhost:8000/panier/add/'+idpanier._id, {id: id})
        .then(()=>{
        })
        .catch((err)=>{console.log(err)})
    }
    const idselect = document.getElementById(id)
    idselect.innerHTML = '<i class="fa-solid fa-check"></i>'
  }else{
    alert("vous ne pouvais pas commender votre produit")
  }
}
//profil
  const profil=(iduser)=>{
    if(iduser){
      window.location = `/2D/profil/${parm.id}/${iduser}`
    }
  }
   //envoi commande
   const creatcommamde= async(user)=>{
    if(user){
      const {userId,prenom,nom ,descrip, photo, photoUser} = user
      if(userId !==parm.id){

        const conversation = {
          senderId: parm.id, 
          receverId:userId
        }
          const res = await axios.post('http://localhost:8000/conversations', conversation)
          if(res.data){
            const message = {
              sender: parm.id,
              photo:photo,
              text:`salut ${prenom} ${nom} commande "${descrip}"`,
              conversationId: res.data._id
          }
          socket.current.emit("sendMessage", {
            photop:photo,
            photo:photoUser,
            senderId: parm.id, 
            receiverId: userId, 
            text:`salut ${prenom} ${nom} commande "${descrip}"`,
           })
          await axios.post('http://localhost:8000/messsages/'+res.data._id,message);
          window.location = `/2D/messenger/${parm.id}/${res.data._id}`
        }
        }else{
      alert("vous ne pouvais pas discuter sur votre produit")
    }
    }
   }
// creation d'une discussion
   const discussion =async(userId)=>{
    const conversation = {
      senderId: parm.id, 
      receverId:userId
    }
    if(userId !==parm.id){

       await axios.post('http://localhost:8000/conversations', conversation)
       .then((doc)=>{
         const data = doc.data;
         window.location = `/2D/messenger/${parm.id}/${data._id?data._id:"sms"}`
        })
        .catch((err)=>{
          console.log(err);
        })
    }else{
      alert("vous ne pouvais pas discuter sur votre produit")
    }
    }

    const filterC=(data)=>{
        return data.filter((item)=>(
          item.TypeDeCategorie?.includes(parm.categorie?parm.categorie:filtreCa)
        ))
    }
    console.log(filterC(produits));
  return (
    <>
    {
    produits.length?(
    <div className='elmProduit'>
      {
        filterC(produits)?.map((produit)=>(
          <div className="eleme" key={produit._id}>
            <div className="user" onClick={()=>profil(produit.users[0]._id)}>
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
              <div className="itmePr"><button className='btn btn-commd' id={produit._id} onClick={()=>{
                addPrdtPanier({ id :produit._id, idUser: produit.users[0]._id});
                creatcommamde({
                  userId: produit.users[0]._id,
                  prenom: produit.users[0].prenom,
                  nom: produit.users[0].nom,
                  descrip:produit.description,
                  photo:produit.photoProduit,
                  photoUser: produit.users[0].photo
                  })}}>Commander</button></div>
              <div className="itmePr"><button className='btn btn-commd' onClick={()=>{discussion(produit.users[0]._id)}}>Discuter</button></div>
            </div>
          </div>
        ))
      }
    </div>
    ):  <div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
  }
    </>
  )
}
