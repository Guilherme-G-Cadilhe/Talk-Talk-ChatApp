import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { withBaseLayout } from '../../layouts/Base.component'
import { useChatsStore } from '../../../js/store';



function ChatCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const createChats = useChatsStore((state) => state.createChats)

  const onSubmit = (data) => {
    createChats(data).then(() => navigate(`/home`))
    // createChats(data).then((chatId) => navigate(`/chat/${chatId}`))
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Create new Chat</div>
          <div className="subheader">Get together with others</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="name"
                name="name"
                maxLength={20}
                placeholder='Name of the channel.'
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                name="description"
                placeholder='Your channel description'
                className="form-control"
                maxLength={50}
                id="description" />
            </div>
            <label htmlFor="image">Image</label>
            <input
              {...register("image")}
              type="text"
              className="form-control mb-3"
              id="image"
              name="image"
              placeholder='https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg' />
            {/* {loginError && <div className="alert alert-danger small">{loginError?.message || "An error occurred"}</div>} */}
            <button
              type="submit"
              className="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default withBaseLayout(ChatCreate, { canGoBack: true })