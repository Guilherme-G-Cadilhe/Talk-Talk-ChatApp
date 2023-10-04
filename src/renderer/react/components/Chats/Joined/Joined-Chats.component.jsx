import React from "react";
import { useNavigate } from "react-router-dom";
import SearchChats from "../Search/Search-Chats.component";

const JoinedChatsList = ({ chats }) => {
  const navigate = useNavigate();

  return (
    <div className="list-container">
      <SearchChats />
      <ul className="items">
        {chats.length && chats.map(chat => {
          const { id, image, name } = chat
          return (<li key={id}
            onClick={() => { navigate(`/chat/${id}`) }}
            className="item">
            <div className="item-status">
              <img src={image} alt="Retail Admin" />
              <span className="status online"></span>
            </div>
            <p className="name-time" >
              <span className="name mr-2" >{name}</span>
            </p>
          </li>)
        }) || null}
      </ul>
    </div>
  )
}

export default JoinedChatsList;