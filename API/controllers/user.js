const User = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

// Créer un compte
exports.signup = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  userInfo = {
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: hash,
  }
  console.log("user prêt à être créé", userInfo)  
  try {
    const user = await User.create(userInfo)
    console.log("Utilisateur créé !", userInfo)
    res.status(200).json({
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      token: jwt.sign({ userId: user.id }, `secretToken`, {
        expiresIn: "24h",
      }),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: "Erreur serveur" })
  }
};

// Connexion à un compte
exports.login = async (req, res, next) => {
  const user = await User.findOne( {where: { email: req.body.email }})
    .then(user => {
      if (!user == null) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//modifier mdp (PUT)
exports.modifyPassword = async (req, res, next) => {
  const user =  await User.findOne({ where: { token: req.body.token }})
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.updateOne({_password: hash}, { ...User, _id: user.id })
        .then(() => res.status(201).json({message: 'Mot de passe modifiée !'}))
        .catch(error => res.status(400).json({ error }))
      });
    });      
  });
};

//modifier pseudo (PUT)
exports.modifyPseudo = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    console.log("User trouvé : ", user.dataValues)
    if (req.body.pseudo) {
      user.pseudo = req.body.pseudo
      console.log("Ancien pseudo : ", user.pseudo)
    }
    try {
      user.save({})
      console.log("New userInfo : ", user)
      res.status(200).json({
        user: user,
        messageRetour: "Votre profil a bien été modifié",
      })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre profil" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

//deconnexion
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

//supprimer le compte (DELETE)
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token })
    .then(user => {
      user.destroy();
    });

    return res.status(204).json({message: 'Votre compte a bien été supprimé'});
  } catch (error) {
    return res.status(500).json({error});
  }
};