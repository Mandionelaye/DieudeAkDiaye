import React, { useRef } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './accuil.css'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min.js'
import Role from './ROLE/Role';
import CadreProduits from './cadreProduits/cadreProduits';
import Footer from './footer/Footer';
export default function Accuil() {
  const images =[
    '/image/1.jpg',
    '/image/3.jpg',
    '/image/5.jpg',
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
      name:'Informatique',
       icone:"fa-solid fa-laptop"
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
    name:'SPORT',
    img:"/image/sport.jpg"
  },
  {
    id:2,
    name:"ANIMAUX",
     img:"/image/animaux.jpg"
  },
  {
    id:3,
    name:'PHONE',
     img:"/image/iphone.jpeg"
  },
  {
    id:4,
    name:'TV',
     img:"/image/tv.webp"
  },
  {
    id:5,
    name:'BEAUTE',
     img:"/image/beaute.jpg"
  },
  {
    id:6,
    name:'MODE',
     img:"/image/robe.jpg"
  },
  {
    id:7,
    name:'REFIGERATEUR',
     img:"/image/frigo.jpg"
  },
  {
    id:8,
    name:'VOITURE',
     img:"/image/voiture.jpg"
  },
  {
    id:9,
    name:'TABLETTE',
    img:"/image/tablette.jpg"
  },
  {
    id:10,
    name:'SHOES',
     img:"/image/shoes.jpg"
  },
  {
    id:11,
    name:'IMFORMATIQUE',
     img:"/image/mac.jpg"
  },
  {
    id:12,
    name:'SAC',
     img:"/image/sac.jpg"
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
          <Link to={'/'} className='home p-2'><i className="fa-solid fa-house"></i></Link>
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
          <button type="button" className="btne" onClick={next}>
           <i className="fa-solid fa-less-than"></i>
           </button>
          <div className="slidep" ref={carosel1}>
          { produits.map((produit)=>(
             <div className="cardimg" key={produit.id}>
              <img src={produit.img} alt="img" className="imge1"/>
              <p>{produit.name}</p>
              </div>
              ))
              }
           </div>  
          <button type="button" class="btne" onClick={back}>
           <i className="fa-solid fa-greater-than"></i>
           </button>
          </div>
          <div className="ensemble-fleche2">
          <button type="button" className="btne" onClick={next2}>
           <i className="fa-solid fa-less-than"></i>
           </button>
          <div className="slidep2" ref={carosel2}>
          { produits.reverse().map((produit)=>(
             <div className="cardimg" key={produit.id}>
              <img src={produit.img} alt="img" className="imge1"/>
              <p>{produit.name}</p>
              </div>
              ))
              }
           </div>  
          <button type="button" className="btne" onClick={back2}>
           <i className="fa-solid fa-greater-than"></i>
           </button>
         </div>
         </div>
         <Role/>
         <CadreProduits/>
         <Footer/>
    </div> 
    </>
  )
}
