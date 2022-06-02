import React, { useState, useEffect } from "react"
import NewComment from "../Commentaires/NewComment";
import Comments from "../Commentaires/Comment";
import dayjs from 'dayjs';
import { GET } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr.js")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({ post, deletePost }) {

  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
  const [dataComment, setDataComment] = useState([])
  const [showComments, setshowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [data, setErrorData] = useState("")

  const addComment = newComment => {
    setDataComment(prevState => {
      return [...prevState, newComment]
    })
  }
  const deleteComment = commentDelete => {
    let updateComment = dataComment.filter(i => i.id !== commentDelete.id)
    setDataComment(updateComment)
  }

  // récuperation  des données dans le local storage
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user.id
  const userAdmin = user.admin

  // get comments
  function loadComments() {
    GET(ENDPOINTS.GET_ALL_COMMENTS, {
      content: data.content
    })
    .then (resComments => {
      if (resComments.status === 400) {
        setErrorData("Commentaires non chargés!");
      }
      if (resComments.status === 200) {
        setErrorData("Commentaires chargés!")
      }
    })
    .catch (error => {
    })
  }
  useEffect(() => {
    loadComments();
      if (post.users_id === userId || userAdmin) {
        setDeleteIconTrash(true)
      }
  }, []);

  // like Posts
  function likeHandle() {
    GET(ENDPOINTS.LIKE_UNLINKE, {
    })
    .then (res => {
      if (res.status === 404) {
        setErrorData("Likes pas fonctionnel!")
      }
      if (res.status === 200) {
        setErrorData("Likes!")
      }
    })
    .catch (error => {
    })
  }

  // get likes
  function loadLikes() {
    GET(ENDPOINTS.GET_LIKES , {
    })
    .then (resLikes => {
      if (resLikes.status === 404) {
        setErrorData("Likes non chargés!")
      }
      if (resLikes.status === 200) {
        setErrorData("Likes chargés!")
        setShowLikes(data.length)
      }
    })
    .catch (error => {
    })
  }
  
  useEffect(() => {
    loadLikes();
  }, [])

  return (
    <div>
      <div className="card-feed">
        <div className="flex-avatar">
          <h4 className="author-posts">{post.User.pseudo}</h4>
        </div>
          <span className="time_post">{dayjs(post.createdAt).locale("fr").fromNow()}</span>
          <div className="post-feed">
            <p className="text-post">{post.text_content}</p>
          </div>
        <div className="footer-post-feed">
          <FavoriteIcon className="favorite-icon" onClick={likeHandle} />
          <span className="all-likes">{showLikes}</span>
          <span>
            {DeleteIconTrash && (
              <DeleteIcon className="delete-icon"
                onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce post ?")) {
                  deletePost()
                }
              }} />
            )}
          </span>
        </div>

        <div className="all-comments"><MessageIcon className="icon-message" />
          <span className="p-comments">Commenter</span>
          {showComments && dataComment.map((comments, i) => (
            <Comments className="comments"
              comments={comments}
              key={i}
              commentDelete={deleteComment}
              posts_id={post.id}
            />
          ))}
        </div>
        <div className="ajout-new-comment">
          <NewComment posts_id={post.id} newComment={addComment} />
        </div>
      </div>
    </div>
  )
}

export default PostFeed;