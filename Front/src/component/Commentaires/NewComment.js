import React from "react"
import { useState } from "react"
import { PUT } from '../Api/Axios';
import ENDPOINTS from "../Api/Endpoints";
import SendIcon from '@mui/icons-material/Send';

function NewComment({ posts_id, newComment }) {
  const [commentMessage, setCommentMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const [errorData, setErrorData] = useState("")
  const userId = JSON.parse(localStorage.getItem("user")).id

  const onSubmit = data => {

    const response = PUT(ENDPOINTS.CREATE_COMMENT, {
      users_id: userId,
      posts_id: posts_id,
      content: commentMessage,
    })
    if (response.status === 400) {
      setErrorData("Vous n'êtes pas inscrit!");
    }
    if (response.status === 201) {
      newComment(response.data.comment)
      window.location.reload()
    }
  }


  return (
    <div>
      <form onSubmit={(onSubmit)} className="comment-form">
        <input className="new-comment"
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={e => setCommentMessage(e.target.value)}
          value={commentMessage}
          id="input-comment"
        />
        {setSendButton && (
          <SendIcon className="send-icon" onClick={onSubmit} />
        )}
      </form>
    </div>
  )
}

export default NewComment;