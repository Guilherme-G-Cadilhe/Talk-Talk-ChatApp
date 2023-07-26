import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();



  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline-secondary">
            Home
          </button>
          <Link to="/settings" className="btn btn-outline-success ml-2">Settings</Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <Link
            to="/register"
            className="btn btn-outline-danger ml-2">Register</Link>
          <Link
            to="/login"
            className="btn btn-outline-success ml-2"
          >Login</Link>
          {/* <button
            onClick={() => navigate(-1) || navigate('/')}
            className="btn btn-sm btn-outline-primary ml-2">
            Back
          </button> */}
          {/* <button
            onClick={() => { }}
            className="btn btn-sm btn-outline-success ml-2">Login</button> */}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;