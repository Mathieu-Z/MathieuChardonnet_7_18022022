module.exports = (req,res,next) => {
  try {
    User.findOne({ token: req.body.token })
    .then(user => {
      if (user.isAdmin == 1) {
        next();
      } else {
        res.status(401).json({ error: new Error('Vous n\'avez pas les droits nécessaires !')});
      }
    })
  } catch {
    console.log("ici")
    res.status(401).json({ error: new Error('Requête invalide !')});
  }
}