import React, { useEffect, useState } from 'react'
import { Avatar,IconButton } from '@material-ui/core';
import { MoreVert,SearchOutlined, AttachFile,InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import axios from './axios';
import { useStateValue } from '../StateProvider';


const Chat = ({messages})=>{
    const [seed,setSeed]= useState('');
    const [input,setInput]= useState('');
    const [{user}, dispatch]= useStateValue()

    useEffect(()=>{
        setSeed(Math.round(Math.random()*50000))
    },[])
    const sendMessage = async(e)=>{
        e.preventDefault();
        await axios.post('/messages/new',{
            message: input,
            name: user.displayName,
            timestamp: new Date().toUTCString(),
            recieved: true
        })
        setInput('')
    }
    return(
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>Helping Hands</h3>
                     <p>Last seen at {" "}{messages[messages.length -1]?.timestamp}</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton >
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                 {messages.map(message=>{
                    return(
                            <p key={message._id} className={`chat__message ${ message.name ===user.displayName? 'chat__receiver':" "}`}>
                                 <span className="chat__name">{message.name}</span>
                                 {message.message}
                                <span className="chat__timestamp">
                                    {message.timestamp}
                                </span>
                            </p>
                    )})}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} placeholder='type message' type='text' onChange={e=>setInput(e.target.value)} />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;