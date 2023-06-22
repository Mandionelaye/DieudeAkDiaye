import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import Conversations from './Conversations/Conversations';
import Message from './message/Message'
import io from "socket.io-client"
import './messenger.css'

export default function Messenger({command,setIdcomversation}) {
    const param = useParams();
    const [conversation, setConversation] = useState([]);
    const [linMssg, setLinMssg] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatcurr, setChatcurr] = useState(null);
    const [messages, setMessagges] = useState([]);
    const [arrivalMessages, setArrivalMessagges] = useState(null);
    const socket= useRef();
    const [newMessages, setNewMessages] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [users, setUsers] = useState([]);
    const [discution, setDiscution] = useState();
    const [query, setQuery] = useState('');
    const keys = ["prenom", "nom"]
    const scrollRef = useRef();
    
    useEffect(()=>{
        const getUsersAll = async()=>{
            try{
                const res = await axios.get('http://localhost:8000/users')
                setUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getUsersAll();
        },[param]);


    useEffect(()=>{
      socket.current = io("ws://localhost:8900");
  
    },[]);


    useEffect(()=>{
        socket.current.on("getMessage", data =>{
            console.log(data);
        setArrivalMessagges({
            photo:data.photop,
            sender:data.senderId,
            text: data.text,
            createdAt: Date.now(),
           })
          });
    }, []);

  useEffect(()=>{
    socket.current.on("getDiscution", (data)=>{
      setDiscution(data.discution)
    })
  },[])

    useEffect(()=>{
        if(arrivalMessages){
        const exist = currentChat?.members.find(member=> member._id === arrivalMessages.sender[0]._id)
        exist &&
        setMessagges((prev)=>[...prev, arrivalMessages])
    }
    
    },[arrivalMessages, currentChat])

    useEffect(()=>{
        if(discution){
            setCurrentChat(discution);
            setChatcurr(discution);
            setShowMessage(true)
        setConversation((prev)=>[...prev, discution])
    }
    
    },[discution])


  useEffect(()=>{
    socket.current.emit("addUser", param.id);
    socket.current.on("getUsers", user=>{
       setOnlineUsers(
        users.filter((f) => user.some((u) => u.userId === f._id))
       );
    })
  },[param, users])


    useEffect(()=>{
    const getConversations = async()=>{
        try{
            const res = await axios.get('http://localhost:8000/conversations/'+param.id)
            const conv = res.data;
            setLinMssg(conv.filter((m)=> m.members[0]._id === param.id || m.members[1]._id === param.id))
            if(param.ex!=="sms"){
               setConversation(conv.filter((c)=> c._id === param.ex));
               param.ex ='sms'
            }else{
                setConversation(conv.reverse());
            }
            
        }catch(err){
            console.log(err);
        }
    }
    getConversations();
    },[param, linMssg])


    useEffect(()=>{
        const getMessages = async()=>{
            try{
                const res = await axios.get('http://localhost:8000/message/'+currentChat?._id)
               setMessagges(res.data);
            }catch(err){
             console.log(err);   
            }
        }
        getMessages();
    },[currentChat])

    const handleSubmit = async(e)=>{
       e.preventDefault();
       const message = {
        sender: param.id,
         text:newMessages,
         conversationId: currentChat._id
       };
     
       const receiverId = currentChat.members.find(member=> member._id !==param.id)
       const user = currentChat.members.find(member=> member._id ===param.id)
       socket.current.emit("sendMessage", {
        photo:user.photo,
        senderId: param.id, 
        receiverId: receiverId._id, 
        text:newMessages,
       })

       try{
         const res = await axios.post('http://localhost:8000/messsages/'+currentChat._id,message)
          setMessagges([...messages, res.data])
          setNewMessages('')
        }catch(err){
        console.log(err);
       }
    }
useEffect(()=>{
   scrollRef.current?.scrollIntoView({behavior:'smooth'})
   
},[messages])

useEffect(()=>{
    if(conversation.length===1){
        setCurrentChat(conversation[0])
         setShowMessage(true); 
        setChatcurr(conversation[0].members.filter((m)=>m._id!==param.id))
        
    }
    if(currentChat){
        setIdcomversation(currentChat);
    }
}, [conversation,param,currentChat, setIdcomversation])
const search = (data)=>{
    return data.filter((item)=> 
    item?.members.some((members)=> 
    keys.some((key)=> members[key]?.toLowerCase().includes(query)
    ))
    )
}
  return (
    <>
    <div className='messenger'>
    
    {
      !showMessage?
        <div className="chatMenu">
            <div className="barremessenger">
                <p className="titreMessenger">Discution</p>
            </div>
            <div className="chatMenuWrapper">
                <input placeholder='Search for friends' className='chatMenuInput'
                 onChange={(e)=> setQuery(e.target.value)}/>
                <div className="containerConversation">
                 { conversation.length?(
                    search(conversation).map((c)=>(
                        <div onClick={()=>{setCurrentChat(c); setShowMessage(true); 
                        setChatcurr(c.members.filter((m)=>m._id!==param.id));  setIdcomversation(c);}} key={c._id}>
                    <Conversations conversation={c} currentUser={param.id} onlineUsers={onlineUsers}/>
                    </div>
                    ))
                 ):
                 <span className='noConversationText mt-5 pt-5'>pas de conversation pour le moment</span>
                } 
                </div>
            </div>
        </div>
        :
        <div className="chatBox">
                 <div className="petitMenu">
                 <button className='btn' onClick={()=>{ setCurrentChat(null) ;setShowMessage(false); setIdcomversation(null)}}>
                 <i class="fa-solid fa-arrow-right fa-rotate-180"></i>
                </button>
                 <div className="profilMesseger">
                    <div className="chatImgContainer">
                        <img className='chatImg' src={chatcurr[0]?.photo?chatcurr[0].photo:"/image/avatar.jpg"} alt="" />
                        <div className="chatOnlineBadg"></div>
                    </div>
                    <span className="chatOnlineName">{chatcurr[0]?.prenom} {chatcurr[0]?.nom}</span>
                </div>
                 </div>
            <div className="chatBoxWrapper">
                {
                    currentChat?(
                 <>
                 <div className="chatBoxTop">
                 {messages.length?
                    messages.map((m)=>(
                        <div ref={scrollRef} key={m._id}>
                            <Message message={m} own={ m.sender[0]._id === param.id }/>
                        </div>
                    ))
                :<div className='loading'><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>}
                </div>
                <div className="chatBoxBottom">
                  <textarea className='ChatMessageInput' placeholder='write something...' onChange={(e)=>{setNewMessages(e.target.value)}} value={newMessages}></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                </div></>
                ):
                <span className='noConversationText'>Open a conversation to start a chat.</span>
                }
             </div>
        </div>
        }
    </div>
    </>
  )
}
