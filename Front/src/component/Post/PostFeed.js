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
  const userId = user.userId
  const userAdmin = user.isAdmin

  // get comments
  function loadComments() {
    GET(ENDPOINTS.GET_ALL_COMMENTS.replace(':postId', post.id), {
      //postId: post.id
    })
    .then (resComments => {
      if (resComments.status === 400) {
        setErrorData("Commentaires non chargés!");
      }
      if (resComments.status === 200) {
        setErrorData("Commentaires chargés!")
        //console.log(resComments);
        
        //setDataComment(resComments.data)
        setshowComments(resComments.data.length > 0)
      }
    })
    .catch (error => {
    })
  }

  useEffect(() => {
    loadComments();
    console.log(post.userId, userId, userAdmin);
      if (post.userId === userId || userAdmin) {
        setDeleteIconTrash(true)
      }
  },[post.userId, userId, userAdmin]
  );

  // like post
  function likeHandle() {
    let test = ENDPOINTS.LIKE_UNLINKE.replace(':idPost', post.id)
    //console.log(test.replace(':id', post.userId))
    GET(test.replace(':id', post.userId), {

    })
    .then (res => {
      if (res.status === 404) {
        setErrorData("Likes pas fonctionnel!")
      }
      if (res.status === 200) {
        //window.location.reload();
        setErrorData("Likes!")
      }
    })
    .catch (error => {
    })
  }

  // get likes
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

  function postLikes() {
    /*const response = POST(ENDPOINTS.GET_LIKES.replace(':id', post.id) , {

    })*/
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

        <div className="all-comments"><MessageIcon className="icon-message" />
          <span className="p-comments">Commenter</span>
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