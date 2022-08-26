import React from 'react';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { POST, POSTFILE } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';


function PostCreate(props) {
// Gestion du formulaire avec useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [emptyMessage, setEmptyMesssage] = useState(null)
  const [, setErrorData] = useState("")
  const [file, setFile] = useState(false)
  const [postImage, setPostImage] = useState(null)

  const handleImage = e => {
    setPostImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const onSubmit = async content => {
    const userId = JSON.parse(localStorage.getItem("user")).userId
    if (content.text_content || file) {
      setEmptyMesssage(false)

      // POST
      if (file) {
        let data2 = new FormData()
        data2.append("userId", userId)
        data2.append("content", content.text_content)
        data2.append("image", file)
        POSTFILE(ENDPOINTS.CREATE_POST, data2)

        .then (response => {
          if (response.status === 400) {
            setErrorData("Post non créé!")
          }
          if (response.status === 201) {
            setErrorData("Post créé!")
            window.location.reload()
          }
        })
        .catch (error => {
        });
      } else {
        POST(ENDPOINTS.CREATE_POST, {
          userId: userId,
          content: content.text_content,
          imageUrl: null,
        },{})
        .then (response => {
          if (response.status === 400) {
            setErrorData("Post non créé!")
          }
          if (response.status === 201) {
            setErrorData("Post créé!")
            window.location.reload()
          }
        })
        .catch (error => {
        });
      }
    } else {
      setEmptyMesssage(true)
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="header-post">
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
        <div>
          <input className='fichier-post'
            type="file"
            id="imageUrl"
            name="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={e => handleImage(e)}
          />
          <div className="button-container">
            <input className="button" type="submit" value="Publier" />
          </div>
        </div>


        <div className="message-post">
          <p>
            {emptyMessage && "Veuillez publiez un message avec ou sans une image !"}
          </p>
          <img src={postImage} alt="" />
        </div>
      </form>
    </div>
  )
};


export default PostCreate;