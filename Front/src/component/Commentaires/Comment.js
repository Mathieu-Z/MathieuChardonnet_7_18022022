import React, { useState, useEffect } from "react"
import { DELETE } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

//  DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function Comments({ comments }) {

  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
  const [, setErrorData] = useState("")

  const user = localStorage.getItem("user")
  const userId = JSON.parse(user).userId
  const userAdmin = JSON.parse(user).isAdmin

  function deleteComment(id) {
    if (userAdmin === 1){
      DELETE(ENDPOINTS.DELETE_COMMENT_ADMIN.replace(':id', id), {})
      .then (response => {
        if (response.status === 400) {
          setErrorData("Vous n'avez pas les droits de supprimer ce commentaire!");
        }
        if (response.status === 200) {
          (window.confirm("Votre commentaire à bien été supprimé!"))
          setErrorData("Commentaire supprimé!");
          window.location.reload()
        }
      })
      .catch (error => {
      });
  
    } if (userId === comments.userId){
      DELETE(ENDPOINTS.DELETE_COMMENT.replace(':id', id), {})
      .then (response => {
        if (response.status === 500) {
          setErrorData("Vous n'avez pas les droits de supprimer ce commentaire!");
        }
        if (response.status === 200) {
          (window.confirm("Votre commentaire à bien été supprimé!"))
          setErrorData("Commentaire supprimé!");
          window.location.reload()
        }
      })
      .catch (error => {
      });
    }
  }

  useEffect(() => {
      if (comments.userId === userId || userAdmin) {
        setDeleteIconTrash(true)
      }
    }, [userId, userAdmin]
  );

  return (
    <div className="card-comments">
      <div className="card-comments-header">
        <p className="author-comments">{comments.User.pseudo}</p>
      </div>
      <div className="comments-text">
        <p className="comments-text-p">{comments.content}</p>
      </div>
      <span className="comments-trash">
        {DeleteIconTrash && (
          <DeleteIcon className="delete-icon-comments"
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                deleteComment(comments.id)
              }
            }} 
          />
        )}
      </span>
    </div>
  )
}

export default Comments;