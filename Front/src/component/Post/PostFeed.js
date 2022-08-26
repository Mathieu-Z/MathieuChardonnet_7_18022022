import React, { useState, useEffect } from "react"
import NewComment from "../Commentaires/NewComment";
import Comments from "../Commentaires/Comment";
import dayjs from 'dayjs';
import { GET, POST } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';

// Gérer l'heure de post avec DAYJS
require("dayjs/locale/fr.js")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({ post, deletePost }) {
  const [DeleteIconTrash, setDeleteIconTrash] = useState(false)
  const [dataComment, setDataComment] = useState([])
  const [showComments, setshowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)
  const [, setErrorData] = useState("")

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
  const userId = user.userId
  const userAdmin = user.isAdmin

  // get comments
  async function loadComments() {
    GET(ENDPOINTS.GET_ALL_COMMENTS.replace(':postId', post.id), {

    })
    .then (resComments => {
      if (resComments.status === 400) {
        setErrorData("Commentaires non chargés!");
      }
      if (resComments.status === 200) {
        setErrorData("Commentaires chargés!")
        setDataComment(resComments.data)
        setshowComments(resComments.data.length > 0)
      }
    })
    .catch (error => {
    })
  }

  useEffect(() => {
    loadComments();
      if (post.userId == userId || userAdmin) {
        setDeleteIconTrash(true)
      }
    },[post.userId, userId, userAdmin]
  );

  // get length likes
  function loadLikes() {
    GET(ENDPOINTS.GET_LIKES.replace(':id', post.id) , {

    })
    .then (resLikes => {
      if (resLikes.status === 404) {
        setErrorData("Likes non chargés!")
      }
      if (resLikes.status === 200) {
        setErrorData("Likes chargés!")
        setShowLikes(resLikes.data.length)
      }
    })
    .catch (error => {
    })
  }

  //create likes
  function postLikes() {
    POST(ENDPOINTS.CREATE_LIKES, {
      userId: userId,
      postId: post.id,
    })
    .then (respostLikes => {
      if (respostLikes.status === 404) {
        setErrorData("Likés !")
      }
      if (respostLikes.status === 201) {
        setErrorData("Dislikés !")
        window.location.reload();
      }
    })
    .catch (error => {
    })
  }
  
  useEffect(() => {
    loadLikes();
  },)

  return (
    <div>
      <div className="card-feed">
        <div className="post-info">
          <div className="post-info-author"> {post.User.pseudo} </div>
          <span className="post-info-time">{dayjs(post.createdAt).locale("fr").fromNow()}</span>
        </div>
          <div className="post-feed">
            <p className="text-post">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="post-image"
                className="post-image-feed"
              />
            )}
          </div>
        <div className="footer-post-feed">
          <FavoriteIcon className="favorite-icon" onClick={postLikes} />
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

        <div className="all-comments">
          <div className="comments-index">
            <MessageIcon className="icon-message" />
            <span className="p-comments">Commentaires</span>
          </div>
          {showComments && dataComment.map((comments, i) => (
            <Comments className="comments"
              comments={comments}
              key={i}
              commentDelete={deleteComment}
              postId={post.id}
            />
          ))}
        </div>
        <div className="ajout-new-comment">
          <NewComment postId={post.id} newComment={addComment} />
        </div>
      </div>
    </div>
  )
}

export default PostFeed;