import { useEffect, useState } from 'react'
import './chatOnline.css'
import axios from 'axios';

export default function ChatOnline({onlineUsers, currendId, setCurrentChat}) {
     const [onlinefriends, setOnlineFriends] = useState([]);


useEffect(() =>{
    onlineUsers&&
    setOnlineFriends(onlineUsers.filter((users)=> users._id !== currendId))

}, [currendId,onlineUsers])
const handleclick = async(user) =>{
    try{
       const res = await axios.get(`http://localhost:8000/conversations/${currendId}/${user._id}`);
       setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
}

  return (
    <div className='chatOnline'>
      {onlinefriends.map((o)=>(
      <div className="chatOnlinefriend" onClick={()=>{handleclick(o)}}>
        <div className="chatOnlineImgContainer">
            <img className='chatOnlineImg' src={o?.photo?o.photo:"/image/avatar.jpg"} alt="" />
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.prenom} {o?.nom}</span>
      </div>
        ))}
    </div>
  )
}
