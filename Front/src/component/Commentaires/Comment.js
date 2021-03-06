import React, { useState, useEffect } from "react"
import { DELETE } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

//  DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function Comments({ comments, commentDelete }) {

  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
  const [data, setErrorData] = useState("")

  const userInfo = JSON.parse(localStorage.getItem("user"))
  const userId = userInfo.id
  const userAdmin = userInfo.isAdmin

  useEffect(() => {
    if (comments.user.id === userId || userAdmin === 1) {
      setDeleteIconTrash(true)
    }
  }, [userId, userAdmin])

  async function deleteComment() {
    DELETE(ENDPOINTS.DELETE_POST, {
      id: data.comments.id,
    })
    .then (response => {
      if (response.status === 400) {
        setErrorData("Vous n'avez pas les droits de supprimer ce commentaire!");
      }
      if (response.status === 200) {
        (window.confirm("Votre commentaire à bien été supprimé!"))
        window.location.reload()
      }
    })
    .catch (error => {
    });
  }

  return (
    <div className="card-comments">
      <div className="card-comments-header">
        <p className="author-comments">{comments.user.pseudo}</p>
      </div>
      <div className="comments-text">
        <p className="comments-text-p">{comments.content}</p>
      </div>
      <span>
        {DeleteIconTrash && (
          <DeleteIcon className="delete-icon-comments"
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                deleteComment(comments.id)
              }
            }} />
        )}
      </span>
    </div>
  )
}

export default Comments;