import React, { useState } from 'react'
import axios from 'axios'
import './autantification.css'
import { Link } from 'react-router-dom';

export default function Autantification({user}) {
    const [error, setError]= useState(null)
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    function inputEmail(e){ setEmail(e.target.value); }
    function inputPassword(e){ setPassword(e.target.value); }
    const inputs = [
        {
            id:1,
            labeel:"email",
            type:"email",
            placeholder:'email',
            value:email,
            function:inputEmail,
        },
        {
            id:2,
            labeel:"mots de passe",
            type:"password",
            value:password,
            placeholder:'password',
            function:inputPassword,
        },
    ]
    const envoi =async (e)=>{
        e.preventDefault();
        try{
        await axios.post('http://localhost:8000/connection',{ email:email, password:password})
        .then((res)=>{
          localStorage.setItem('token', res.data.token)
              setEmail('')
              setPassword('')
              window.location = "/2D/"+res.data.nom
        })
      }catch(err){
          if(
            err.response&&
            err.response.status >= 400 &&
            err.response.status <= 500
          ){
            setError(err.response.data.message)
          }
        }
        
    }

  return (
    <div className=' container pt-5'> 
      <div className=' containeA'>
        <h2>2D</h2>
        <p>Diaye ak Dieude</p>
         <form  onSubmit={envoi} className='w-50 m-auto pt-5 pb-5' >
        {error?(<h3 className='text-center text-danger'>{error}</h3>):null}
        {
          inputs.map((input)=>(
              <div className='mb-5 w-70' key={input.id} >
              <input type={input.type} placeholder={input.placeholder} value={input.value} required className='form-control' onChange={input.function}/>
              </div>
          ))
        }
      <input type="submit" value="connecter" className='botn btn  btn-primary' />
        </form>
       <Link to={"/inscrition"} className='inscr'>ceer un compte</Link>
        </div>   
    </div>
  )
}
