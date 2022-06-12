import React from 'react';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { POST } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';


function PostCreate(props) {
// Gestion du formulaire avec useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [emptyMessage, setEmptyMesssage] = useState(null)
  const [ , setErrorData] = useState("")

  const onSubmit = async content => {
    const data = { users_id: users_id, text_content: content.text_content };
    if (content.text_content) {
      setEmptyMesssage(false)
    } else {
      data = data
    }
    // POST
    POST(ENDPOINTS.CREATE_POST, {
      userId: data.users_id,
      postId: data.postId,
      content: data.commentMessage,
    })
    .then (response => {
      if (response.status === 400) {
        setErrorData("Post non créé!")
      }
      if (response.status === 201) {
        setErrorData("Post créé!")
      }
    })
    .catch (error => {
    });
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="haeder-post">
          <textarea
            row={2}
            type="textarea"
            className="text_content_input"
            {...register("text_content", {
              minLength: {
                value: 10,
                message:
                  "Vous devez créer un post de 10 caractères minimum !",
              },
              maxLength: {
                value: 500,
                message: "Vous êtes au maximum de caractères pour ce post !",
              },
            })}
          />
          {errors.text_content && <span className='error-msg'>{errors.text_content.message}</span>}
        </div>
        <div className="button-container">
          <input className="button" type="submit" value="Publier" />
        </div>

        <div className="message-post">
          <p>
            {emptyMessage && "Veuillez publiez un message !"}
          </p>
        </div>
      </form>
    </div>
  )
};


export default PostCreate;