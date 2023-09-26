import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../../js/store";

const RegisterView = () => {
  const { register, handleSubmit } = useForm();
  const registerUser = useAuthStore((state) => state.registerUser)
  const registerError = useAuthStore((state) => state.registerError)

  const onSubmit = (data) => {
    registerUser(data.email, data.password, data.username, data.avatar)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            {...register("avatar")}
            type="text"
            name="avatar"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            name="password"
            type="password"
            className="form-control"
            id="password" />
        </div>
        {registerError && <div className="alert alert-danger small">{registerError?.message || "An error occurred"}</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
  )
}

export default RegisterView;