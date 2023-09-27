import React, { useState } from 'react'
import { createTimestamp } from '../../../../js/utils/time';

function MessageInput({ onSubmit }) {
  const [value, setValue] = useState('')

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateMessage();
      setValue('');
    }
  }

  const validateMessage = () => {
    if (value.trim() === '') return
    const messageObj = {
      content: value.trim(),
      timestamp: createTimestamp()
    }
    onSubmit(messageObj);
  }

  return (
    <div className='chat-input form-group mt-3 mb-0'>
      <textarea
        className='form-control'
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        value={value}
        row="3"
        style={{ resize: 'none' }}
        placeholder='Type your message here...'
      >
      </textarea>
    </div>
  )
}

export default MessageInput