import React from 'react';
import { useState, useEffect } from "react";
import { GET } from '../component/Api/Axios';
import { DELETE } from '../component/Api/Axios';
import ENDPOINTS from '../component/Api/Endpoints';

function Feed() {
  const [posts, setPosts] = useState([])
  const Token = localStorage.getItem("Token")
  const user = localStorage.getItem('user')
  const userId = JSON.parse(user).id

  /*async function loadPosts() {
      try {
          // récuperation de tous les posts
          const { data } = await api.get("/posts");
          setPosts(data)
      } catch (error) {
          console.log('erro')
      }
  }
  useEffect(() => {
      loadPosts()
  }, [Token, setPosts, userId])
  const addnewpost = () => {
      window.location.reload()
  }

  // Delete Post
  async function deletePost(id) {
      try {
          await api.delete(`/posts/${id}`);
          const data = posts.filter(post => post.id != id);
          setPosts(data);
          window.location.reload();
      } catch (error) {
          console.log('erro')
      }
  }*/
  
  return (
      <main className="main">
          <div className="feed">
              <div className='posts'>
                  <PostCard addPost={addnewpost}></PostCard>
              </div>
              <h1> Nouvelles publications:</h1>

              {posts.map(post => (
                  <div className="getAll-Post" key={post.id}>
                      <PostFeed post={post}
                          deletePost={() => deletePost(post.id)} />
                  </div>
              ))}

          </div>
      </main>
  );
};


export default Feed;