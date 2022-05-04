import React, { useState, useEffect } from "react"
import NewComment from "../commentaires/NewComment";
//import dayjs from 'dayjs';
import { DELETE } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';

// Gérer l'heure de posts avec DAYJS
require("dayjs/locale/fr")
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

function PostFeed({ post, deletePost }) {

  const [dataComment, setDataComment] = useState([])
  const [showComments, setshowComments] = useState(false)
  const [showLikes, setShowLikes] = useState(false)

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
  async function loadComments() {
    try {
      const { data } = await api.get(`/comments?id=${post.id}`)
      setDataComment(data)
      setshowComments(data.length > 0)
    } catch (error) {
    }
  }
  useEffect(() => {
    loadComments();
      if (post.users_id === userId || userAdmin) {
        setDeleteIconTrash(true)
      }       
  }, []);

  // like Posts
  const likeHandle = async data => {
    try {
      const response = await api.get(`/likes/${post.id}/like/${userId}`)
        await api.post("/likes", {
          users_id: userId,
          posts_id: post.id,
          like: !response.data
        })
      const countLikes = !response.data ? showLikes + 1 : showLikes - 1;
      setShowLikes(countLikes)
    } catch (error) {
      console.log(error.message)
    }
  }
  // get likes
  async function loadLikes() {
    try {
      const { data } = await api.get(`/likes/posts/${post.id}`)
      setShowLikes(data.length)
    } catch (error) {
    }
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