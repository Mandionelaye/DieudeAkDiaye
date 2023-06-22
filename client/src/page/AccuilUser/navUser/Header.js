import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import io from "socket.io-client";
import './header.css'


export default function Header({idcomversation}) {
    const param = useParams();
    const [user,setUser]= useState('');
    const [filt,setFilt]= useState([]);
    const [message,setMessage]= useState(null);
    const socket= useRef();

    useEffect(()=>{
      socket.current = io("ws://localhost:8900");

      socket.current.emit("addUsernav", param.id);
    },[param]);
    
    useEffect(()=>{
      const data= async ()=>{
          try{
     await axios.get("http://localhost:8000/users/"+param.id)
   .then((doc)=>{
    const data = doc.data
      setUser(data.photo)
   })
  }catch(err){
      console.log(err);
   }
  }
   data();
  },[param])

  useEffect(()=>{
    const filtre = async()=>{
      try{
        const res = await axios.get('http://localhost:8000/filtre/'+param.id);
        const datafil = res.data.filter((m)=> m?.sender[0] !== param.id )
        console.log(res.data);
        setFilt( !idcomversation?datafil 
          : datafil.filter((m)=> m.conversationId !== idcomversation._id))
      }catch(err){
        console.log(err);
      }
    }
    filtre();
  }, [param, idcomversation]);
  useEffect(()=>{
    socket.current.on("getNoctification", data =>{
      console.log(data);
      setMessage({
        sender:data.senderId,
        text: data.text,
        createdAt: Date.now(),
       })
      });
}, []);

  useEffect(()=>{
   if(!idcomversation){

     if(message){
       setFilt((prev)=>[...prev, message])
       setMessage(null)
      }
    }
  },[filt, message, idcomversation]);
  return (
    <>
       <nav className="navs navbar navbar-light">
            <div className="container w-100 blocknav">
              <div className='ietme'>
              <Link className='log'to={'/'+param.id} >
              <p>2D <samp> Dieude ak Diaye</samp></p>
              </Link>
              </div>
              <div className='ietme icones d-flex'>
               <Link className="icone" to={'/2D/'+param.id}><i class="fa-solid fa-house-user"></i></Link>
               <Link className="icone" to={"/2D/panier/"+param.id}><i class="fa-solid fa-cart-shopping"></i></Link>
               <Link className="icone position-relative" to={`/2D/messenger/${param.id}/sms`}>
                <i class="fa-solid fa-message"></i>
                { filt.length?
                  <>
                <span class="mex translate-middle badge rounded-pill bg-danger">
                {filt.length<99?filt.length:99+"+"}</span> 
                </>:null}
               </Link>
             </div>
             <div className='ietme divInput'>
                <input type="search" className='search' placeholder='Recherche produit' onClick={()=> window.location="/2D/search/"+param.id}/> 
                <Link to={"/2D/search/"+param.id}><button className='bttn btn'><i class="fa-solid fa-magnifying-glass"></i></button></Link>
              </div>   
              <div className='ietme profile'>
                <Link to={`/2D/profil/${param.id}/${param.id}`}><img src={user?user:"/image/avatar.jpg"} alt="Prfl" className='imgProfil' /></Link>
              </div>
            </div>
          </nav>
    </>
  )
}
