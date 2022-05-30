const Post = require('../models/posts');
const Like = require('../models/likes');

// création d'un like
exports.createLike = async (req, res, next) => {
  const userId = req.body.users_id;
  const isliked = req.body.like;
  console.log(isliked);
  const postId = req.body.posts_id;

  await Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post introuvable !" });
      } else if (isliked) {
        await Like.create({ users_id: userId, posts_id: postId })
          .then((like) => {
            res.status(201).json({ message: "Post liké" })
          })
          .catch((error) => res.status(400).json({ error }));
      } else if (!isliked) {
        await Like.destroy({
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
exports.getLike = async (req, res, next) => {
  await Like.findAll({ where: { posts_id: req.params.id } })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};

//Renvoie le like si un utilisateur aime un post
exports.isLiked = async (req, res, next) => {
  await Like.findOne({ where: { users_id: req.params.id, posts_id: req.params.idPost } })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};