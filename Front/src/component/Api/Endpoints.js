const endpoints = {
  // CRUD posts
  GET_ALL_POSTS: "/api/post",
  CREATE_POST: "/api/post",
  DELETE_POST: "/api/post/:id",

  // Like & unlike post
  LIKE_UNLINKE: "/api/:idPost/like/:id",
  GET_LIKES: "api/posts/:id",

  // CRUD comments
  GET_ALL_COMMENTS: "/api/comment",
  CREATE_COMMENT: "/api/comment/:id",

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