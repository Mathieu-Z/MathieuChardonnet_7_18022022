const Post = require('../models/post');
const fs = require('fs');

// publier une post (POST)
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new post ({...postObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
  post.save()
    .then(() => res.status(201).json({message: 'Post enregistrée !'}))
    .catch((error) => res.status(400).json({ error }));
};

// trouve toutes les posts (GET)
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(posts => {res.status(200).json(posts)})
    .catch(error => {res.status(400).json({ error })})
};

// trouve une post selon sont id (GET)
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {res.status(200).json(post)})
    .catch(error => {res.status(404).json({ error })});
};

// mise à jour d'une post (PUT)
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?
    {...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };

  Post.updateOne({_id: req.params.id}, { ...postObject, _id: req.params.id })
    .then(() => res.status(201).json({message: 'Post modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// suppression d'un post (DELETE)
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
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

// likes et dislikes (POST)
exports.likes = (req, res, next) => {
  if (req.body.like === 1) {
    Post.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId }})
      .then(post => res.status(200).json({ message: 'Like ajouté !' }))
      .catch(error => res.status(400).json({ error }))
  } else if (req.body.like === -1) {
    Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId }})
      .then(post => res.status(200).json({ message: 'Dislike ajouté !' }))
      .catch(error => res.status(400).json({ error }))
  } else {
    Post.findOne({ _id: req.params.id })
      .then(post => {
        if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }})
            .then(post => { res.status(200).json({ message: 'Like supprimé !' })})
            .catch(error => res.status(400).json({ error }))
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }})
            .then(post => { res.status(200).json({ message: 'Dislike supprimé !' })})
            .catch(error => res.status(400).json({ error }))
        }
      })
    .catch(error => res.status(400).json({ error }));
  }
}