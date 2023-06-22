import  './message.css'
import {format} from 'timeago.js';

export default function Message({message,own}) {
  return (
    <>
    {message?    
    <div className={own?'message own':"message"}>
    <div className="messageTop">
        <img className='messageImg' src={message.sender[0].photo} alt="" />
        <div className='messageText'>
          {message.photo?<img className='messagePrdt' src={message.photo} alt="" />:null}
          {message.text}
        </div>
    </div>
    <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  :null
}
    </>
  )
}
