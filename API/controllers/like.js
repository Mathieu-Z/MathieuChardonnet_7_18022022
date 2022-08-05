const Post = require('../models/posts');
const Like = require('../models/likes');

// création d'un like (POST)
exports.createLike = async (req, res, next) => {
  const userId = req.params.id;
  const postId = req.params.idPost;

  await Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post introuvable !" });
      }
      Like.findOne({ where: {
        userId: userId, 
        postId: postId,
      }})
      .then((like) => {
        if (!like){
          Like.create({
            userId: userId, 
            postId: postId,
          })
          .then((like) => {
            res.status(201).json({ message: "Post liké" })
          })
          .catch((error) => res.status(400).json({ message: "Problème like" }));
        } else {
          Like.destroy({
            where: {
              userId: userId,
              postId: postId,
            },
          })
          .then((like) => {
            res.status(201).json({ message: "Post disliké" })
          })
          .catch((error) =>
            res.status(400).json({ message: "Problème dislike" })
          );
        }
        })
        .catch((error) => res.status(400).json({ message: "erreur" }));
    })
};

//recupérer tous les likes d'un post (GET)
exports.getLike = async (req, res, next) => {
  await Like.findAll({ where: { postId: req.params.id } })
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};

//Renvoie le like si un utilisateur aime un post (GET)
exports.isLiked = async (req, res, next) => {
  await Like.findOne({ where: { userId: req.params.id, postId: req.params.idPost }})
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};