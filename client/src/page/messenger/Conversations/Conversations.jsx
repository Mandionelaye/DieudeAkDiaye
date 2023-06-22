import { useEffect, useState } from 'react'
import './conversation.css'

export default function Conversations({conversation, currentUser, onlineUsers}) {
        const [user, setUser] = useState([]);
        const [showonline, setShowonline] = useState(false);
        const [messages, setMessages] = useState([])

    useEffect(()=>{
        setUser(conversation.members.filter((m)=> m._id !== currentUser))
        setMessages(conversation.Messages.filter((m)=> m.sender[0] !== currentUser))
    }, [currentUser, conversation])  

    useEffect(()=>{
       const onlien= onlineUsers.filter((u)=> u._id === user[0]?._id) ;
         onlien.length===0? setShowonline(false):setShowonline(true)
    },[onlineUsers, user]);
  return (
    <div className='conversation position-relative'>
      {user ? (
       <>
       <div className="chatOnlineImgContainer">
        <img className='conversationImg' src={user[0]?.photo} alt="" />
        {
        showonline && <div className="chatOnlineBadge"></div>
        }
        </div>
        <span className="conversationName">{user[0]?.prenom} {user[0]?.nom}</span>
        {messages.length?
       <span className='he translate-middle badge rounded-pill'>{messages.length}</span>
       :null}
        </> 
      ):null}
    </div>
  )
}
