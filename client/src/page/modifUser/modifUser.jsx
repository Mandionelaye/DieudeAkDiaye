import React, { useEffect, useState } from 'react'
import Header from '../AccuilUser/navUser/Header'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './modifUser.css'

export default function ModifUser() {
  const param = useParams();
  const [data, setData] = useState(null);
  const [nom, setNom]= useState();
  const [prenom, setPrenom]= useState();
  const [lieu, setLieu]= useState();
  const [bio, setBio]= useState();
  const [tel, setTel]= useState();
  const [poseterURL, setPosterURL] = useState(null)
  const [nomEntreprise, setNomEntreprise]= useState();
  const [categories, setCategories]= useState([]);
  const [limite, setLimite] = useState(0);
  const [err, setErr] =useState(false);
  const [dataCategorie, setDataCategorie] =useState([]);
  useEffect(()=>{
    const user= async()=> {
       try{
       axios.get("http://localhost:8000/users/"+param.id)
      .then((doc)=>{
       setData(doc.data)
      })
     }catch(err){
         console.log(err);
      }
   }
   user()
   },[param])
  function inputNom(e){ setNom(e.target.value); }
  function inputPrenom(e){ setPrenom(e.target.value); }
  function inputLieu(e){ setLieu(e.target.value); }
  function inputBio(e){ setBio(e.target.value); }
  function inputTel(e){ setTel(e.target.value); }
  function inputnomEntreprise(e){ setNomEntreprise(e.target.value); }
  function inputCategorie(e){ 
    dataCategorie.push(e.target.value);
      setCategories([...data.categories, ...dataCategorie]);
  }
  function enrImage(e){
    if(e.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= ()=>{
        const dataURL = reader.result.length;
        const vall= dataURL / 1024;
        const imageSizeInKB = Math.round(vall * 100) / 100;
        
        console.log('Taille de l\'image :', imageSizeInKB, 'Ko');
        console.log(dataURL);
        console.log(reader.result);
        setLimite(imageSizeInKB);
         setPosterURL(reader.result)

      }
      reader.onerror= error=>{
        console.log("error:"+ error);
      }
    }else{
      setLimite(1);
    }
  }
  const inputsblock1 = [
      {
          id:1,
          labeel:"Nom",
          type:"text",
          placeholder:data?data.nom?data.nom:"nom":null,
          value:nom,
          function:inputNom,
      },
      {
          id:2,
          labeel:"Prenom",
          type:"text",
          value:prenom,
          placeholder:data?data.prenom?data.prenom:"prenom":null,
          function:inputPrenom,
      },
      {
          id:3,
          labeel:"lieu",
          type:"text",
          value:lieu,
          placeholder:data?data.lieu?data.lieu:"Lieu":null,
          function:inputLieu,
      },
  ]
  const inputBlock2 = [
    {
      id:1,
      labeel:"nom Entreprise",
      type:"text",
      value:nomEntreprise,
      placeholder:data?data.nomEntreprise?data.nomEntreprise:"nom Entreprise":null,
      function:inputnomEntreprise,
  },
    {
      id:2,
      labeel:"Bio",
      type:"text",
      value:bio,
      placeholder:data?data.bio?data.bio:"Bio":null,
      function:inputBio,
  },
  {
    id:3,
    labeel:"tel",
    type:"tel",
    pattern:"[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]-{2}",
    value:tel,
    placeholder:data?data.tel?data.tel:"221-77-777-77-77":null,
    function:inputTel,
},
]
  const categorys =[
  {
      id:1,
      name: "categories",
      icone:"fa-solid fa-gamepad"
  },
  {
    id:2,
    name: "jeux videos & consoles",
    icone:"fa-solid fa-gamepad"
},
  {
    id:3,
    name:"animaux",
     icone:"fa-solid fa-shop"
  },
  {
    id:4,
    name:'electronique',
     icone:"fa-solid fa-mobile-screen"
  },
  {
    id:5,
    name:'electromenager',
     icone:"fa-solid fa-blender-phone"
  },
  {
    id:6,
    name:'sante & beaute',
     icone:"fa-solid fa-heart-pulse"
  },
  {
    id:7,
    name:'informatique',
     icone:"fa-solid fa-laptop"
  },
  {
    id:8,
    name:'mode',
     icone:"fa-solid fa-shirt"
  },
  {
    id:9,
    name:'sport',
     icone:"fa-solid fa-dumbbell"
  },
  {
    id:10,
    name:'pour enfant',
     icone:"fa-solid fa-dumbbell"
  },
]
function envoi(e){
  e.preventDefault();
    if(limite<100){
      axios.put('http://localhost:8000/user/modiff/'+param.id,
      {nom:nom?nom:data.nom , prenom:prenom?prenom:data.prenom, 
        bio:bio?bio:data.bio, photo:poseterURL?poseterURL:data.photo, 
        entreprise:nomEntreprise?nomEntreprise:data.entreprise,
        categories:categories?categories:data.categories,
        tel:tel?tel:data.tel,lieu:lieu?lieu:data.lieu})
        .then((res)=>{
          setNom('');
          setPrenom('');
          setCategories([]);
          setBio('');
          setTel('');
          setLieu('');
          setPosterURL(null);
        })
        .catch((err)=>{
          console.log(err);
        })
        window.location = `/2D/profil/${param.id}/${param.id}`
      }else{
        setErr(true)
      }
}
  return (
    <>
    {data?(
    <div className='modif'>
      <Header/>
      <div className='pt'>
        <form onSubmit={envoi} className='formp'>
          <div className="btnmodif d-flex justify-content-between px-5">
          <Link to={`/2D/profil/${param.id}/${param.id}`}><button className='btn btn-back'><i class="fa-solid fa-circle-chevron-left"></i></button></Link>
        <input type="submit" value="envoi" className='btn btn-ajout' />
        {err?<p className=" text-center text-danger">erreur de modification</p>:null}
        </div>
          <div className="container d-flex dlor">
        <div className="iteminput">
        <div className="inputBlock1">
        <div class="photoP" onClick={()=>document.querySelector("#loge").click()}>
             <input type="file"  id="loge" accept='image/*' hidden placeholder='ajout Produit' onChange={enrImage}/>
                {
                    poseterURL?
                    <div className='mie'>
                    <img src={poseterURL} className='imgmodif'alt="" />
                   { limite>100?<p className=" text-center text-danger">{limite}</p>:<p className="text-center text-success">{limite}</p>}
                    </div>
                    :
                    <div className='imgleod'>
                    <img src={data?data.photo?data.photo:'/image/avatar.jpg':null} className='imgmodif' alt="" />
                    </div>
                }
        </div>
        {
          inputsblock1.map((input)=>(
            <div className="input-group mb-3" key={input.id}>
               <span className='input-group-text bor'>{input.labeel}</span>
               <input type={input.type} className='inpute form-control' placeholder={input.placeholder} onChange={input.function}/>
            </div>
          ))
        }
      </div>
      </div>
      <div className="iteminput">
      <div className="inputblock2">
        {
             inputBlock2.map((input)=>(
              <div className="input-group mb-3" key={input.id}>
                 <span className='input-group-text bor'>{input.labeel}</span>
                 <input type={input.type} className='inpute form-control' placeholder={input.placeholder} onChange={input.function}/>
              </div>
            ))
        }
        {dataCategorie.length?<ul className='d-flex text-sm justify-content-around'>{dataCategorie.map((categorie)=>(<li>{categorie}</li>))}</ul>:null}
        <div className="input-group mb-4">
        <span className='input-group-text bor'>categories</span>
        <select name="categorye" value={categories} className='form-select'  onChange={inputCategorie}>
         {
            categorys.map((category)=>(
                <option key={category.id} value={category.name}>{category.name}</option>
            ))
         }
        </select>
        </div>
      </div>
      </div>
       </div>
      </form>
      </div>
      <div className="footerm">
     <p>© 2023 Copyright: 2D Dieude ak Diaye </p>
      </div> 
    </div>
    ):<div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
  }
    </>
  )
}
