import React, { useState } from 'react'
import './addprdt.css';
import axios from 'axios';

export default function Addprdt({id,imagePrfl, prenom, nom, show}) {
    const [poseterURL, setPosterURL] = useState(null)
    const [catgorie, setCategorie] = useState("");
    const [prix, setprix] = useState(null);
    const [descr, setDescr] = useState("");
    const [showAdd, setShowAdd] = useState(true);
    const [limite, setLimite] = useState(0);
    const [err, setErr] =useState(false);
    show(showAdd)
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
          name:'alimentation générale',
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
        {
          id:10,
          name:'vehicule',
           icone:"fa-solid fa-dumbbell"
        },
     ]
  
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
      }
      }
      function submit(e){
        e.preventDefault();
        if(limite<100 && catgorie){
        try{
           axios.post('http://localhost:8000/produit/'+id, {TypeDeCategorie:catgorie,description:descr,photoProduit:poseterURL,prix:prix})
           setCategorie('')
        setPosterURL(null)
        setDescr('')
        setprix(null)
        setShowAdd(false)
        }catch(err){
            console.log(err);
         }
         window.location=`http://localhost:3000/2D/${id}` 
        }else{
           setErr(true)
        }
      }
  return (
    <div className='carre'>
        <div className='principal'>
           <div className="titrebtn">
            <p>Ajout d'un Produit <button className='btn btn-ferme' onClick={()=>{setShowAdd(false)}}><i className="fa-solid fa-circle-xmark"></i></button></p>
           </div>
           <div className="profiladd">
               <img src={imagePrfl} className='imgProfi' alt="prfl" />
               <p>{prenom} {nom}</p>
           </div>
           {err?<p className=" text-center text-danger text-warning">image supperieur a 100ko ou erreur de saisie</p>:null}
           <form onSubmit={submit}>
             <div className="formul">
           <div class="mb-3 fromu " onClick={()=>document.querySelector("#loge").click()}>
             <input type="file"  id="loge" accept='image/*' hidden required placeholder='ajout Produit' onChange={enrImage}/>
                {
                    poseterURL?
                    <div className='mie'>
                    <img src={poseterURL} className='imgleode' width={100} height={120} alt="" />
                   { limite>100?<p className=" text-center text-danger">{limite}</p>:<p className="text-center text-success">{limite}</p>}
                    </div>
                    :
                    <div className='imgleod'>
                    <div className='leod'><i className="fa-solid fa-cloud-arrow-up"></i></div>
                    <p>image  -100kb</p>
                    </div>
                }
            </div>
            <div className=' mb-3'>
            <input type="number" placeholder='prix' className='me-2 loedprd' required onChange={(e)=>{setprix(e.target.value)}}/>
            <select name="categorie" className='loedprd' placeholder='categorie' required onChange={(e)=>{setCategorie(e.target.value)}}>
                    {
                    categorys.map((category)=>(
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))
                }
            </select>
            </div>
            <input type="text" placeholder='description' className='dscr' required onChange={(e)=>{setDescr(e.target.value)}}/>
            </div>
            <button className='btn btn-submit' type="submit">envoyer</button>
           </form>
        </div>
    </div>
  )
}
