import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
//import LogOut from '../../composent/deconnection/logOut';
import './accuilUser.css'
import Produits from './listeProduits/Produits';
import Addprdt from './addProduit/Addprdt';
import Header from './navUser/Header';
import Messenger from '../messenger/messenger';
export default function AccuilUser() {
  const param = useParams();
   const [dataUser, setDataUser] = useState(null)
   const [show, setShow] = useState(false)
   const [idcomversation, setIdcomversation] = useState('');
   const [senderId, setSenderId] = useState(null)
   const [filtreCa, setFilterCa] = useState('');
   const categorys =[
    {
      id:1,
      name:"Boutique Officielles",
       icone:"fa-solid fa-shop",
       file:""
    },
    {
      id:2,
      name: "Jeux videos & Consoles",
      icone:"fa-solid fa-gamepad",
      file:"jeux videos & consoles"
  },
    {
      id:2,
      name:"Animaux",
       icone:"fa-solid fa-dove",
       file:"animaux"
    },
    {
      id:3,
      name:'Electronique',
       icone:"fa-solid fa-mobile-screen",
       file:"electronique"
    },
    {
      id:4,
      name:'Electromenager',
       icone:"fa-solid fa-blender-phone",
       file:"electromenager"
    },
    {
      id:5,
      name:'Sante & Beaute',
       icone:"fa-solid fa-heart-pulse",
       file:"sante & beaute"
    },
    {
      id:6,
      name:'Alimentation Générale',
       icone:"fa-solid fa-pizza-slice",
       file:"alimentation générale"
    },
    {
      id:7,
      name:'Mode',
       icone:"fa-solid fa-shirt",
       file:"mode"
    },
    {
      id:8,
      name:'Articles de Sport',
       icone:"fa-solid fa-dumbbell",
       file:"sport"
    },
    {
      id:9,
      name:'Pour Enfant',
      icone:"fa-sharp fa-solid fa-baby",
      file:"pour enfant"
    },
    {
      id:10,
      name:'vehicule',
      icone:"fa-sharp fa-solid fa-baby",
      file:"vehicule"
    }
 ]
    useEffect(()=>{
        const data= async ()=>{
            try{
       await axios.get("http://localhost:8000/users/"+param.id)
     .then((doc)=>{
      setDataUser(doc.data)
     })
    }catch(err){
        console.log(err);
     }
    }
     data();
    },[param])
    
    useEffect(()=>{
      const deletemsg = async ()=>{
        try{
        const idmessgas = idcomversation.Messages?.filter((m)=> m.sender[0] !== param.id);
        idmessgas?.forEach((m)=>(
       axios.put('http://localhost:8000/litMessage/'+ idcomversation._id, {id: m._id})
        ))
      } catch(err){
        console.log(err);
   }
    }
  
      idcomversation && deletemsg();
    },[idcomversation, param])
    function showAdd(elm){
          setShow(elm)
    }
    const carosel1 =useRef(null);
    const back=(e)=>{
      e.preventDefault();
      carosel1.current.scrollLeft+=240;
    }
    const next= (e)=>{
      e.preventDefault();
      carosel1.current.scrollLeft-=240;
    }
  return (
    <>{dataUser?(
        <div className='containerU'>
          {show?
          <Addprdt show={showAdd} id={dataUser?dataUser._id:null} imagePrfl={dataUser?dataUser.photo:null} prenom={dataUser?dataUser.prenom:null} nom={dataUser?dataUser.nom:null}/>
          :null  
        }
          <Header idcomversation={idcomversation}/>
          <div className='corpsPrin'>
          <div className={`container conte ${!param.ex?"cont":" "}`}>
          <div className='princ'>
          <button type="button" className={`${param.ex?"dispar":"btne bt"}`} onClick={next}>
                  <i className="fa-solid fa-less-than"></i>
             </button>
             <div className={param.ex?"showMesserger":"Param" } ref={carosel1}>
              {
                param.ex?<Messenger command={senderId} setIdcomversation={setIdcomversation}/>
                :
                <>
              <div className="profil">
               <div className="name">
               <Link to={`/2D/profil/${param.id}/${param.id}`}><img src={dataUser?dataUser.photo:null} className='imgProfi' alt="prfl" /></Link>
               <p>{dataUser?dataUser.prenom:null} {dataUser?dataUser.nom:null}</p>
               </div>
               <p className='entreP'><span><i class="fa-solid fa-city"></i></span> {dataUser?dataUser.nomEntreprise:"Nom entreprise"}</p>
               </div>
               <div className="categorys">
                <div className='ligneCate ling'></div>
                <h5 className='categ ce'>Categories</h5>
                  <ul className='category catacuil'>
                  {
                    categorys.map((category)=>(
                      <li key={category.id} className='liste cp'  onClick={()=>setFilterCa(category.file)}>
                        <i className={category.icone} ></i>
                      {category.name}
                      </li>
                      ))
                  }
                </ul>
               
               </div>
               </>
                    }
             </div>
             <button type="button" className={`${param.ex?"dispar":"btne bt btnex"}`} onClick={back}>
                  <i className="fa-solid fa-greater-than"></i>
             </button>
            </div>
             <div className={param.ex?"showProduit":"Produits"}>
             <div className='ajout'>
              <div className="form d-flex">
              <Link to={`/2D/profil/${param.id}/${param.id}`}><img src={dataUser?dataUser.photo:null} className='imgProfi' alt="prfl" /></Link>
              <p className=' pt-1 ps-2'>{dataUser?dataUser.prenom:null} {dataUser?dataUser.nom:null}</p>
              </div>
              <div className='button'>
                   <div className='itme1 im'>
                      <button className='btnt' onClick={()=>{setShow(true)}}> Ajouter<samp className='btn-ajout'><i className="fa-solid fa-plus"></i></samp></button>
                   </div>
                   <div className="span"></div>
                   <div className='itme1'>
                   <button className='btnt'> Photo<samp className='btn-photo'><i className="fa-solid fa-camera"></i></samp></button>
                   </div>
              </div>
              </div>
              <Produits senderId={setSenderId} filtreCa={filtreCa}/>
             </div>
          </div>
          </div>
        </div>
        ):
        <div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
      }
        </>
  )
}
