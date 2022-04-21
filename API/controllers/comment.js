const Remark = require('../model mongo/comment');

//creation Commentaire (POST)
exports.createRemark = (req, res, next) => {
  const remarkObject = JSON.parse(req.body.post);
  delete remarkObject._id;
  const remark = new post ({...remarkObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});
  remark.save()
    .then(() => res.status(201).json({message: 'Commentaire enregistrée !'}))
    .catch((error) => res.status(400).json({ error }));
};

// trouve tous les commentaires (GET)
exports.getAllRemarks = (req, res, next) => {
  Remark.find()
    .then(remarks => {res.status(200).json(remarks)})
    .catch(error => {res.status(400).json({ error })})
};

// suppression d'un commentaire (DELETE)
exports.deleteRemark = (req, res, next) => {
  Remark.findOne({ _id: req.params.id })
    .then(remark => {
      const filename = remark.imageUrl.split('/images/')[1];
      fs.unlink(`ìmages/${filename}`, () => {
        remark.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};