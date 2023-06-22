import { Link, useParams } from 'react-router-dom'
import './liste.css'

export default function Liste({data}) {
         const {id} =useParams()
  return (
    <div >
         <ul className='listeSeacher'>
          {
            data.map((i)=>(
              <li key={i._id} >
                <Link to={i.photo?`/2D/profil/${id}/${i._id}`:`/2D/${id}/${i._id}`} className='itemListe'>
                 <img src={i.photo?i.photo:i.photoProduit} alt="img" className='imgListe' />
                 <div>
                 <p className='listep'>{i.nom? `${i.prenom} ${i.nom}`: i.description.slice(0,40)}</p>
                 </div>
                 </Link>
              </li>
            ))
          }
         </ul>
    </div>
  )
}
