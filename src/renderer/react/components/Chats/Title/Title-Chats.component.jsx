import React from "react";
import { Link } from "react-router-dom";
const TitleChat = ({ title = '', children }) => {

  return (
    <div className="chat-name-container">
      <span className="name">{title}</span>
      <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>{children}</div>
      {/* <Link
        to="/"
        className="btn btn-primary btn-sm back-button">Back</Link> */}
    </div>
  )
}

export default TitleChat;