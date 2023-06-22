import  './afficheparam.css'

export default function Afficheparam({user}) {
  return (
    <div className="paramProfil">
                <div className="sousProfilBlock">
                <div className="profilUse">
                <ul className='category ps-3'>
                        <li className='liste'><i class="fa-solid fa-city"></i> {user.nomEntreprise?user.nomEntreprise:"off"}</li>
                        <li className='liste'><i class="fa-solid fa-phone"></i> {user.tel?user.tel:"off"}</li>
                        <li className='liste'> <i class="fa-solid fa-location-dot"></i> {user.lieu?user.lieu:"off"}</li>
                </ul>
               </div>
               <div className="categorys">
                <div className='ligneCate'></div>
                <h5 className='categ'>Categories</h5>
                  <ul className='category'>
                  {  
                        user.categories.map((categ)=>(
                                categ==="jeux videos & consoles"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-gamepad"}></i>{categ}</li>)
                                :categ==="animaux"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-shop"}></i>{categ}</li>)
                                :categ==="electronique"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-mobile-screen"}></i>{categ}</li>)
                                :categ==="electromenager"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-blender-phone"}></i>{categ}</li>)
                                :categ==="sante & beaute"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-heart-pulse"}></i>{categ}</li>)
                                :categ==="informatique"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-laptop"}></i>{categ}</li>)
                                :categ==="mode"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-shirt"}></i>{categ}</li>)
                                :categ==="sport"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-dumbbell"}></i>{categ}</li>)
                                :categ==="pour enfant"?
                                ( <li key={categ} className='liste'><i className={"fa-solid fa-dumbbell"}></i>{categ}</li>)
                                :null
                            ))

                  }
                </ul>
               </div>
               </div>
               </div>
  )
}
