import React from 'react'

function MessageInput() {

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      alert(e.target.value)
    }
  }

  return (
    <div className='chat-input form-group mt-3 mb-0'>
      <textarea
        className='form-control'
        onKeyDown={onKeyDown}
        row="3"
        style={{ resize: 'none' }}
        placeholder='Type your message here...'
      >
      </textarea>
    </div>
  )
}

export default MessageInput