import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../js/store";

const Navbar = ({ canGoBack, view }) => {
  const navigate = useNavigate();
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack && <button
            onClick={() => navigate('/home')}
            className="btn btn-outline-secondary">
            Home
          </button>}
          {view !== 'SettingsView' && <Link to="/settings" className="btn btn-outline-success ml-2">Settings</Link>}
        </div>
        <div className="chat-navbar-inner-right">

          {user
            ? <>
              <img className="avatar mr-2" src={user.avatar}></img>
              <span className="logged-in-user">{`Hi ${user.username}`}</span>
              <button
                onClick={() => logoutUser()}
                className="btn btn-sm btn-outline-danger ml-4">
                Logout
              </button>
            </>
            :
            <Link
              to="/"
              className="btn btn-outline-success ml-2"
            >Login</Link>
          }


          {/* <button
            onClick={() => { }}
            className="btn btn-sm btn-outline-success ml-2">Login</button> */}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;