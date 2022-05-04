const Post = require('../models/posts');
const Like = require('../models/likes');

// création d'un like
exports.createLike = (req, res, next) => {
  const userId = req.body.users_id;
  const isliked = req.body.like;
  console.log(isliked);
  const postId = req.body.posts_id;

  Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post introuvable !" });
      } else if (isliked) {
        Like.create({ users_id: userId, posts_id: postId })
          .then((like) => {
            res.status(201).json({ message: "Post liké" })
          })
          .catch((error) => res.status(400).json({ error }));
      } else if (!isliked) {
        Like.destroy({
          where: {
            users_id: userId,
            posts_id: postId,
          },
        })
          .then((like) => {
            res.status(201).json({ message: "Post disliké" })
          })
          .catch((error) =>
            res.status(400).json({ message: "problème destroy like" })
          );
      }
    })
    .catch((error) => res.status(400).json({ message: "erreur destroy" }));
};

//recupérer tous les likes d'un post
exports.getLike = (req, res, next) => {
  Like.findAll({ where: { posts_id: req.params.id } })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};

//Renvoie le like si un utilisateur aime un post
exports.isLiked = (req, res, next) => {
  Like.findOne({ where: { users_id: req.params.id, posts_id: req.params.idPost } })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};