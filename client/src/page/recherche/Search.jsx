import { useEffect, useState } from 'react';
import './search.css';
import axios from 'axios';
import Liste from './liste/Liste';
import { Link, useParams } from 'react-router-dom';

export default function Search() {
    const {id} =useParams();
    const [all, setAll] = useState([]);
    const [query, setQuery] = useState('');

    const keys = ["prenom", "nom", "email","nomEntreprise","lieu","TypeDeCategorie", "description"]  
    useEffect(()=>{
        const getUsersAll = async()=>{
            try{
                const res = await axios.get(`http://localhost:8000/All`)
                setAll(res.data)
            }catch(err){
                console.log(err);
            }
        }
         if (query.length === 0  ||query.length > 2) getUsersAll();
        },[query]);
        const search = (data)=>{
            return data.filter((item)=> 
            keys.some((key)=> item[key]?.toLowerCase().includes(query))
            )
        }
  return (
       <div className="searche">
            <Link to={"/2D/"+id}>
            <button className='btn-search' 
            ><i class="fa-solid fa-circle-chevron-left"></i></button>
            </Link>
            <div className='searchInput'>
             <input type="text" className='searc' placeholder='ecrire...' 
             onChange={(e)=> setQuery(e.target.value)}/> 
            </div>
            {all.length?(
         <Liste data={search(all).slice(0,10)}/>
         ):
         <div className='logsearch'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
         }
        </div>
  )
}
