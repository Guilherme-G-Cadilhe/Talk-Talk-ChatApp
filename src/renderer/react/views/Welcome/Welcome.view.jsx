import React, { useState } from "react";
import { LoginForm, RegisterForm } from "../../components/export.components";
import { useAuthStore } from "../../../js/store";
import { Navigate } from 'react-router-dom';

const WelcomeView = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const user = useAuthStore((state) => state.user)

  if (user) {
    return <Navigate to="/home" />
  }



  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2" style={{ marginBottom: "20px" }}>
          {isLoginView
            ? "Need an account?"
            : "Already registered?"}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            className="btn-link ml-2">
            {isLoginView
              ? "Register"
              : "Login"}
          </span></small>
      </div>
    </div>
  )
}

export default WelcomeView;