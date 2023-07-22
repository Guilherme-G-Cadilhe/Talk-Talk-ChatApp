import React from 'react'

const App = () => {

  const title = "Hello World";
  const enchancedTitle = title + '- React'

  const sendNotification = () => {
    alert('Hello World')
  }
  const sendNotificationNative = () => {
    e_notification.send("Teste")
  }

  return (
    <>
      <h1>{enchancedTitle}</h1>
      <button onClick={sendNotification}>Send Web Alert Notification</button>
      <button onClick={sendNotificationNative}>Send Native Alert Notification</button>
    </>
  )
}

export default App;