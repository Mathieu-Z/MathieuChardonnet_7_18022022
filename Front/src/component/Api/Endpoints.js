const endpoints = {
  // CRUD posts
  GET_ALL_POSTS: "/api/post/",
  CREATE_POST: "/api/post/create/",
  DELETE_POST: "/api/post/:id",
  DELETE_POST_ADMIN: "/api/post/admin/:id",

  // Like & unlike post
  LIKE_UNLINKE: "/api/:idPost/like/:id",
  GET_LIKES: "api/posts/:id",

  // CRUD comments
  GET_ALL_COMMENTS: "/api/comment/:postId",
  CREATE_COMMENT: "/api/comment/:id",
  DELETE_COMMENT: "/api/comment/:id",
  DELETE_COMMENT_ADMIN: "/api/comment/admin/:id",

  // Auth
  USER_SIGNUP: "/api/auth/signup",
  USER_LOGIN: "/api/auth/login",
  USER_LOGOUT: "/api/auth/logout",

  // CRUD user
  GET_ONE_USER: "/api/auth/:id",
  GET_ALL: "/api/auth/",
  UPDATE_PSEUDO: "/api/auth/",
  UPDATE_PASSWORD: "/api/auth/passwordChange",
  DELETE_USER: "/api/auth/deleteUser",
};

export default endpoints;