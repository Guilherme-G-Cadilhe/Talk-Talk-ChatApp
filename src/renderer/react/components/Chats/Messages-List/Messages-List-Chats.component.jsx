
import React, { useCallback } from 'react'
import { useAuthStore } from '../../../../js/store'
import { formatTimeAgo } from '../../../../js/utils/time'

function MessagesListChat({ innerRef, messages = [] }) {
  const user = useAuthStore((state) => state.user)

  const isAuthorOf = useCallback((message) => message?.author.uid === user.uid ? "chat-left" : "chat-right")

  return (
    <div className="chat-container">
      <ul ref={innerRef} className="chat-box chatContainerScroll">
        {messages.length && messages.map(message => {
          return (
            <li
              key={message.id}
              className={isAuthorOf(message)}>
              <div className="chat-avatar">
                <img
                  src={message.author.avatar}
                  alt="Retail Admin" />
                <div className="chat-name">{message.author.username}</div>
              </div>
              <div className="chat-text-wrapper">
                <span className="chat-text">{message.content}</span>
                <span className="chat-spacer"></span>
                <div className="chat-hour">{formatTimeAgo(message.timestamp)}</div>
              </div>
            </li>
          )
        }) || 'Sem mensagens...'}
      </ul>
    </div>
  )
}

export default MessagesListChat