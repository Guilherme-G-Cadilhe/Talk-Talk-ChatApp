import React from "react";
import { useChatsStore } from "../../../../js/store";

const AvailableChatsList = ({ chats }) => {
  const joinChat = useChatsStore((state) => state.joinChat)

  const askForConfirmation = chat => {
    const accepted = confirm(`Do you want to join: ${chat.name}?`)
    if (accepted) {
      joinChat(chat)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        {chats.length
          ?
          chats.map((chat) => {
            const { id, description, image, name } = chat
            return (<div key={id} className="col-lg-3 col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{description}</p>
                  <button
                    onClick={() => askForConfirmation(chat)}
                    className="btn btn-outline-primary">Join Chat</button>
                </div>
              </div>
            </div>)
          })
          :
          (<div className="container-fluid">
            <div className="alert alert-warning">{`No chats to join :(`}</div>
          </div>)}

      </div>
    </div>
  )
}

export default AvailableChatsList;