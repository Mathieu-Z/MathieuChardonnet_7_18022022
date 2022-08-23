const Post = require('../models/posts');
const User = require('../models/user');
const Comment = require('../models/comments');
const fs = require('fs');

// publier un post (POST)
exports.createPost = async (req, res, next) => {
  //console.log(req);
  try {
    const user = await User.findOne({
      attributes: ["pseudo", "id"],
      where: {id: req.body.userId},
      order: [["createdAt", "DESC"]],
    })
    if (user !== null) {
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
  try {  
    await Post.findAll({
      attributes: ["id", "content", "imageUrl", "createdAt", "userId"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["pseudo", "id"],
        }
      ]
    })
    .then(posts =>{
      posts.map(post => {
        if( post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
        });
        res.json(posts)
      })
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenue lors de la récupération des posts ",
    })
  }
};

// trouve une post selon sont id (GET)
exports.getOnePost = async (req, res, next) => {
  await Post.findOne({where: {id: req.params.id}})
    .then(post => {res.status(200).json(post)})
    .catch(error => {res.status(404).json({ error })});
};

// mise à jour d'un post (PUT)
exports.modifyPost = async (req, res, next) => {
  try {  
    const post = await Post.findOne({id: req.params.id})
    console.log("Post trouvé : ", post.dataValues)
    if (req.body.content) {
      post.content = req.body.content
    }
    try {
      post.save({})
      console.log("New postInfo : ", post)
      res.status(200).json({
        post: post,
        messageRetour: "Votre post à bien été modifié",
      })
    } catch {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre post" })
    }
  } catch {
    return res.status(500).send({ error: "Erreur serveur" })
  }
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