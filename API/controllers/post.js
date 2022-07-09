const Post = require('../models/posts');
const User = require('../models/user');
const Comment = require('../models/comments');
const fs = require('fs');

// publier une post (POST)
exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["pseudo", "id"],
      where: {id: req.params.userId},
      order: [["createdAt", "DESC"]],
    })
    if (user !== null) {
      console.log("user :", user)
      let imageUrl
      if (req.file) {
        console.log("filename", req.file.filename)
        imageUrl = `${req.file.filename}`
      } else {
        imageUrl = null
      }
      const post = await Post.create({
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: imageUrl,
      })
      post.dataValues.user = user.dataValues
      console.log("Post créé :", post.dataValues)
      res.status(201).json({post: post})
    } else {
      res.status(400).json({réponse: "L'utilisateur n'existe pas"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};

// trouve toutes les posts (GET)
exports.getAllPosts = async (req, res, next) => {
  await Post.findAll({
    attributes: ["id", "content", "imageUrl", "createdAt", "userId"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["pseudo", "id"],
      },
    ],
  })
  .then(posts => {res.status(200).json(posts)})
  .catch(error => {res.status(404).json({ error })});
};

// trouve une post selon sont id (GET)
exports.getOnePost = async (req, res, next) => {
  await Post.findOne({ id: req.params.id })
    .then(post => {res.status(200).json(post)})
    .catch(error => {res.status(404).json({ error })});
};

// mise à jour d'un post (PUT)
exports.modifyPost = async (req, res, next) => {
  const postObject = req.file ?
    {...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} 
    : { ...req.body };
  await Post.update({id: req.params.id}, { ...postObject, id: req.params.id })
    .then(() => res.status(201).json({message: 'Post modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// suppression d'un post (DELETE)
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({where: {id: req.params.id}})
    console.log("Post trouvé :", post)
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images")[0]
      console.log("Filename to Delete", filename)
      fs.unlink(`images/${filename}`, function(error) {
        if(error){
          throw error;
        }
        Comment.destroy({where : {postId: req.params.id}})
        Post.destroy({where: {id: req.params.id}})
        res.status(200).json({message: "Post et image supprimés"})
      })
    } else {
      Post.destroy({where: {id: post.id}}, {truncate: true})
      res.status(200).json({message: "Post supprimé"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};