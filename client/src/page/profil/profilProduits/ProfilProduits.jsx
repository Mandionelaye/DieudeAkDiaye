import { useParams } from 'react-router-dom';
import  './profilProduits.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProfilProduits({user, idpanier}) {
    const param = useParams();
 const [show, setShow] = useState(false)
 const [produit, setProduit] = useState([]);
 const [commende, setCommende] = useState('');

    useEffect(()=>{
        if(user){
            setProduit(user.produits)
         }
        if(param.id===param.id1){
            setShow(true);
        }
    },[show,param, user]);

      //ajout d'un produit dans le panier
      const addPrdtPanier=async(user)=>{
        const {id, idUser} = user;
        if(idUser!== param.id){
    
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

    const creatDicussionCommande= async(user)=>{
        if(user){
          const {userId,prenom,nom ,descrip, photo} = user
          if(userId !==param.id){
           
            const conversation = {
              senderId: param.id, 
              receverId:userId
            }
              await axios.post('http://localhost:8000/conversations', conversation)
              .then(async(res)=>{
                const doc = res.data;
                const message = {
                  sender: param.id,
                photo:photo,
                text:`salut ${prenom} ${nom} commande "${descrip}"`,
                conversationId: doc._id
              }
    
              await axios.post('http://localhost:8000/messsages/'+doc._id,message);
    
            })
            .catch((err)=>{
              console.log(err);
            })

            setCommende(`commende "${descrip}"`)
        }
        }
       }
       const deleteProduit = async(id, descrip)=>{
        try{
             const res = await axios.put("http://localhost:8000/user/supp/" +param.id, {id:id})
             if(res.data){
              alert("vous avez supprimer un produit")
             }
        }catch(err){
              console.log(err);
            }
          setProduit(produit.filter((p)=> p._id !== id))    
          setCommende(`delete "${descrip}"`)
       }
       setTimeout(()=>{
        setCommende('')
    },2000);
  return (
    <div className="produitsProfil ">
      {
          commende &&   <div id="notifiction">
             {commende} 
            </div>
      }
                {produit.length?(
            produit.reverse().map((produit)=>(
                    <div className="eleme wid " key={produit._id}>
                    <div className="user">
                    <img src={user.photo} alt="img" className='imgProfi' />
                    <p>{user.prenom} {user.nom}</p>
                    </div>
                    <div className="descrip">
                    <p>{produit.description}</p>
                    </div>
            <img src={produit.photoProduit} className='imgPrdt' alt="prdt" />
            <div className="btnPrdt">
                 <div className="itmePr"><p className="prix">{produit.prix} F</p></div>
                    {!show?(
                    <div className="itmePr"><button className='btn btn-commd' id={produit._id} onClick={()=>{
                        addPrdtPanier({ id :produit._id, idUser: user._id});
                        creatDicussionCommande({
                            userId: user._id,
                            prenom: user.prenom,
                            nom: user.nom,
                            descrip:produit.description,
                            photo:produit.photoProduit
                        })}
                    }>Commander</button>
                </div>
                    ):
                <div className="itmePr"><button className='btn btn-commd' onClick={()=>{
                    deleteProduit(produit._id, produit.description)
                }}>Delete</button>
                </div>
                }
                </div>
            </div>
            ))):
            <div className="offPrdt">
            <p className="pasPrdt">Vous avait pas encore publier de produit</p>
            </div>
            }
</div>
  )
}
