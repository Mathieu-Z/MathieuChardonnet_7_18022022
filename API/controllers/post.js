const Post = require('../models/posts');
const User = require('../models/user');
const fs = require('fs');

// publier une post (POST)
exports.createPost = async (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  console.log(postObject)
  //delete postObject._id;
  const post = new post ({...postObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
  post.save()
    .then(() => res.status(201).json({message: 'Post enregistrée !'}))
    .catch((error) => res.status(400).json({ "blabla":"blabla" }));
};

// trouve toutes les posts (GET)
exports.getAllPosts = async (req, res, next) => {
  await Post.findAll({
    attributes: ["id", "content", "imageUrl", "createdAt", "userId"],
    order: [["createdAt", "DESC"]],
    /*include: [
      {
        model: User,
        attributes: ["pseudo", "id"],
      },
    ],*/
  })
  .then(posts => {res.status(200).json(posts)})
  .catch(error => {res.status(404).json({ error })});
};

// trouve une post selon sont id (GET)
exports.getOnePost = async (req, res, next) => {
  await Post.findOne({ _id: req.params.id })
    .then(post => {res.status(200).json(post)})
    .catch(error => {res.status(404).json({ error })});
};

// mise à jour d'une post (PUT)
exports.modifyPost = async (req, res, next) => {
  const postObject = req.file ?
    {...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };

  await Post.update({_id: req.params.id}, { ...postObject, _id: req.params.id })
    .then(() => res.status(201).json({message: 'Post modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// suppression d'un post (DELETE)
exports.deletePost = async (req, res, next) => {
  await Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`ìmages/${filename}`, () => {
        post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};