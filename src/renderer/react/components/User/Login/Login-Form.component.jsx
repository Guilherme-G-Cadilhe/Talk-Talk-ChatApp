import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../../js/store";

const LoginView = () => {
  const { register, handleSubmit } = useForm();
  const loginUser = useAuthStore((state) => state.loginUser)
  const loginError = useAuthStore((state) => state.loginError)

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Welcome!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            className="form-control"
            id="password" />
        </div>
        {loginError && <div className="alert alert-danger small">{loginError?.message || "An error occurred"}</div>}
        <button
          type="submit"
          className="btn btn-outline-primary">
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginView;

{/* <small className="form-text text-muted mt-2">Not registered yet?
<span
  onClick={() => { }}
  className="btn-link ml-2">Register</span>
</small> */}