import React, { useRef } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './accuil.css'
import { Link, useParams } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min.js'
import Role from './ROLE/Role';
import CadreProduits from './cadreProduits/cadreProduits';
import Footer from './footer/Footer';
export default function Accuil() {
  const {id}=useParams();
  const images =[
    '/image/1.jpg',
    '/image/3.jpg',
    '/image/5.jpg',
    "/image/motre.jpg",
    "/image/airforce_.jpg",
    "/image/tablette.webp",
    "/image/lunette.jpg",
    "/image/casque.jpg",
  ]
  const images1 =[
    '/image/4.webp',
    '/image/6.jpg',
    '/image/iMAg.jpg',
  ]
  const images2 =[
    '/image/senegal5.webp',
    '/image/2.webp',
    '/image/sac2.jpg',
  ]
 const categorys =[
    {
      id:1,
      name: "Jeux videos & Consoles",
      icone:"fa-solid fa-gamepad"
  },
    {
      id:2,
      name:"Boutique Officielles",
       icone:"fa-solid fa-shop"
    },
    {
      id:3,
      name:'Telephones & Tablettes',
       icone:"fa-solid fa-mobile-screen"
    },
    {
      id:4,
      name:'Electromenager',
       icone:"fa-solid fa-blender-phone"
    },
    {
      id:5,
      name:'Sante & Beaute',
       icone:"fa-solid fa-heart-pulse"
    },
    {
      id:6,
      name:'alimentation générale',
       icone:"fa-solid fa-pizza-slice"
    },
    {
      id:7,
      name:'Mode',
       icone:"fa-solid fa-shirt"
    },
    {
      id:8,
      name:'Articles de Sport',
       icone:"fa-solid fa-dumbbell"
    },
    {
      id:9,
      name:'Autres Categories',
      icone:"fa-solid fa-ellipsis-vertical"
    }
 ]
const produits = [
  {
    id:1,
    name:'Haltere',
    img:"/image/sport.jpg",
    category:"sport"
  },
  {
    id:2,
    name:"Mouton",
     img:"/image/animaux.jpg",
     category:"animaux"
  },
  {
    id:3,
    name:'Iphone 14',
     img:"/image/iphone.jpeg",
     category:"electronique"
  },
  {
    id:4,
    name:'Televisieur',
     img:"/image/tv.webp",
     category:"electronique"
  },
  {
    id:5,
    name:'Matériel de cheveux',
     img:"/image/beaute.jpg",
     category:"sante & beaute"
  },
  {
    id:6,
    name:'Robe',
     img:"/image/robe.jpg",
     category:"mode"
  },
  {
    id:7,
    name:'Refigerateur',
     img:"/image/frigo.jpg",
     category:"electromenager"
  },
  {
    id:8,
    name:'Voitur',
     img:"/image/voiture.jpg",
     category:"vehicule"
     
  },
  {
    id:9,
    name:'Tablette',
    img:"/image/tablette.jpg",
    category:"electronique"
  },
  {
    id:10,
    name:'Shoes',
     img:"/image/shoes.jpg",
     category:"mode"
  },
  {
    id:11,
    name:'Macbook pro',
     img:"/image/mac.jpg",
     category:"electronique"
  },
  {
    id:12,
    name:'Sac',
     img:"/image/sac.jpg",
     category:"mode"
  },
]
const produits2=[
  {
    id:1,
    name:'Cuisiniere',
    img:"/image/cuisiniere.jpeg",
    category:"electromenager"
  },
  {
    id:2,
    name:'Ecouteur',
    img:"/image/ecouteur.jpg",
    category:"electronique"
  },
  {
    id:3,
    name:'Ensemble Jean',
    img:"/image/ensembleJean.jpg",
    category:"mode"
  },
  {
    id:4,
    name:'Haltere',
    img:"/image/aleter2.jpg",
    category:"sport"
  },
  {
    id:5,
    name:'Jus',
    img:"/image/juse-fuit.png",
    category:"alimentation générale"
  },
  {
    id:6,
    name:'Pigeons',
    img:"/image/pigeons.jpeg",
    category:"animaux"
  },
  {
    id:7,
    name:'Play 5',
    img:"/image/play4.jpg",
    category:"jeux videos & consoles"
  },
  {
    id:8,
    name:'Poussete',
    img:"/image/poussete.jpg",
    category:"pour enfant"
  },
  {
    id:9,
    name:'volant Ps4',
    img:"/image/volantPs4.jpg",
    category:"jeux videos & consoles"
  },
  {
    id:10,
    name:'Lactel',
    img:"/image/lactel.jpg",
    category:"alimentation générale"
  },
  {
    id:11,
    name:'trotteur',
    img:"/image/trotteur.webp",
    category:"pour enfant"
  },
]
const carosel1 =useRef(null);
const carosel2 =useRef(null);
const next= (e)=>{
  e.preventDefault();
  carosel1.current.scrollLeft-=240;
}
const back=(e)=>{
  e.preventDefault();
  carosel1.current.scrollLeft+=240;
}
const next2=(e)=>{
  e.preventDefault();
  carosel2.current.scrollLeft-=240;
}
const back2=(e)=>{
  e.preventDefault();
  carosel2.current.scrollLeft+=240;
}
  return (
    <>
    <div className='containers'>
    <div className="fond">
          <nav className="nav navbar ">
          <div className="container-fluid">
          <Link className="navbar-brand">
            <p className='logo'>2D</p>
            <p className='dd'>Diaye Ak Dieude</p>
          </Link>
          <div className="d-flex navi">
          <Link to={ !id?'/':'/2D/'+id} className='home p-2'><i className="fa-solid fa-house"></i></Link>
          <Link to={"/connecter"} className='conn p-2'>se connecter</Link>
          <Link to={"/inscrition"} className='ins p-2'>s'inscrire</Link>
          </div>
        </div>
      </nav>
      <div className="recher">
      <input type="search" placeholder='recherche' className='inputeR'/>
      <button type="button" className='btnR' ><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
       </div>
       <div className='containe'>
         <div className="m1">
            <ul className='category'>
              {
                categorys.map((category)=>(
                  <li key={category.id}><i className={category.icone}></i>{category.name}</li>
                ))
              }
            </ul>
         </div>
         <div className="m2">
          <Carousel autoPlay interval={6000} infiniteLoop showIndicators={false} showStatus={false} showThumbs={false}>
            {
              images.map((image)=>(
                <div key={images.length-1}>
                  <img src={image} alt="img" className='imge'/>
                </div>
              ))
            }
          </Carousel>
         </div>
         <div className="m3">
           <div className='m31'>
             <Carousel autoPlay interval={6000} infiniteLoop showIndicators={false} showStatus={false} showThumbs={false} >
            {
              images1.map((image)=>(
                <div key={images.length-1}>
                  <img src={image} alt="img" className='img'/>
                </div>
              ))
            }
          </Carousel>
           </div>
           <div className='m32'>
           <Carousel autoPlay interval={6000} infiniteLoop showIndicators={false} showStatus={false} showThumbs={false} >
            {
              images2.map((image)=>(
                <div key={images.length-1}>
                  <img src={image} alt="img" className='img'/>
                </div>
              ))
            }
          </Carousel>
           </div>
         </div>
         </div>
         <div className="carosele">  
      <div className="ensemble-fleche">
          <button type="button" className="btne px-2" onClick={next}>
           <i className="fa-solid fa-less-than"></i>
           </button>
          <div className="slidep" ref={carosel1}>
          { produits.map((produit)=>(
            <Link to={id?`/2D/filter/${id}/${produit.category}`:`/connecter/filter/${produit.category}`} className='categorieProd'>
             <div className="cardimg" key={produit.id}>
              <img src={produit.img} alt="img" className="imge1"/>
              <p>{produit.name}</p>
              </div>
              </Link>
              ))
              }
           </div>  
          <button type="button" class="btne px-2" onClick={back}>
           <i className="fa-solid fa-greater-than"></i>
           </button>
          </div>
          <div className="ensemble-fleche2">
          <button type="button" className="btne px-2" onClick={next2}>
           <i className="fa-solid fa-less-than"></i>
           </button>
          <div className="slidep2" ref={carosel2}>
          { produits2.map((produit)=>(
            <Link to={id?`/2D/filter/${id}/${produit.category}`:`/connecter/filter/${produit.category}`} className='categorieProd'>
             <div className="cardimg" key={produit.id}>
              <img src={produit.img} alt="img" className="imge1"/>
              <p>{produit.name}</p>
              </div>
              </Link>
              ))
              }
           </div>  
          <button type="button" className="btne px-2" onClick={back2}>
           <i className="fa-solid fa-greater-than"></i>
           </button>
         </div>
         </div>
         <Role/>
         <CadreProduits id={id}/>
         <Footer/>
    </div> 
    </>
  )
}
