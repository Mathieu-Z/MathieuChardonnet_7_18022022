const User = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Créer un compte (POST)
exports.signup = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  userInfo = {
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: hash,
  }
  try {
    const user = await User.create(userInfo)
    res.status(200).json({
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: "24h",
      }),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: "Erreur serveur" })
  }
};

// Connexion à un compte (POST)
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
          return res.status(200).json({
            userId: user.id,
            pseudo: user.pseudo,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id },
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
  const authHeader = req.headers.authorization;
  if (!authHeader){
    return res.status(401).json({ error: 'token inexistant' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      'RANDOM_TOKEN_SECRET'
    );
    await User.findOne({where: { id: decoded.userId }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        bcrypt.hash(req.body.newPassword, 10)
        .then(hash => {
          user.update({password: hash}, { ...User, id: user.id })
          .then(() => res.status(201).json({message: 'Mot de passe modifiée !'}))
          .catch(error => res.status(400).json({ error }))
        });
      });      
    });
  }catch{
    return res.status(401).json({ error: 'Requête invalide !'});
  }
};

//modifier pseudo (PUT)
exports.modifyPseudo = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    if (req.body.pseudo) {
      user.pseudo = req.body.pseudo
    }
    try {
      user.save({})
      console.log("New userInfo : ", user)
      res.status(200).json({
        user: user,
        messageRetour: "Votre profil à bien été modifié",
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

//deconnexion (GET)
exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

//supprimer le compte (DELETE)
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token })
    .then(user => {
      user.destroy();
    });

    return res.status(204).json({message: 'Votre compte a bien été supprimé'});
  } catch (error) {
    return res.status(500).json({error});
  }
};