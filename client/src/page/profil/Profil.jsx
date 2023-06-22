import React, { useEffect, useState } from 'react';
import './profil.css';
import axios from 'axios'
import { useParams,Link } from 'react-router-dom';
import Header from '../AccuilUser/navUser/Header';
import LogOut from '../../composent/deconnection/logOut';
import Afficheparam from './afficheParam/Afficheparam';
import ProfilProduits from './profilProduits/ProfilProduits';

export default function Profil() {
    const [user, setUser] = useState(null)
    const [idpanier, setIdpanier] = useState(null)
    const [show, setShow] = useState(false)
    const [showbio, setShowbio] = useState(false)
    const param = useParams();
    useEffect(()=>{
        const data= async ()=>{
            try{
       await axios.get("http://localhost:8000/users/"+param.id1)
     .then((doc)=>{
        setUser(doc.data)
     })
     const res = await axios.get("http://localhost:8000/users/"+param.id)
     const data = res.data;
     setIdpanier(data.panier[0])
    }catch(err){
        console.log(err);
     }
    }
    if(param.id===param.id1){
        setShow(true);
    }
     data();
    },[param])

  return (
   <>
       { user?(
        <div className='profilUser'>
        <Header/>
        <div className="container p-profil">
            <div className='blockPrp'>
            <div className="blockProfil">
             <div className="sousblock">
                <img src={user.photo} alt="img" className='imgPrfl' />
                <div className="textProfil">
                    <p className="fullname">{user.prenom} {user.nom}</p>
                    <p className="bio" onDoubleClick={()=>setShowbio(false)} onClick={()=> setShowbio(true)}>{user.bio?showbio?user.bio:user.bio.slice(0,50)+"...":"bio......"}</p>
                </div>
             </div>
             <div className="blockbtn">
             {show?<>
               <div className="itmbtn"><Link to={"/2D/profil/modif/"+param.id}><button className="btn btn-modifp">modifer votre profil</button></Link></div>
               <div className="itmbtn"><LogOut/></div>
               </>:null}
             </div>
            </div>
            </div>
            <div className="sousAccuil">
                <Afficheparam user={user}/>
                <ProfilProduits user={user} idpanier={idpanier}/>
            </div>
        </div>
        </div>
       ):
       <div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
       }
    </>
  )
}
