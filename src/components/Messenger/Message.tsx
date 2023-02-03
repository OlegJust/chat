import React, { useContext, useEffect, useRef, RefObject } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { MessageType } from '../../interface/main'

interface MessageProps {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className='messageInfo'>
        <img
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt=''
        />
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='' />}
      </div>
    </div>
  )
}

export default Message
