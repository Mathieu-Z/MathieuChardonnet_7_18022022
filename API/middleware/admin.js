const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req,res,next) => {
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
      if (user.isAdmin == 1) {
        next();
      } else {
        return res.status(401).json({ error: new Error('Vous n\'avez pas les droits nécessaires !')});
      }
    })
  } catch {
    return res.status(401).json({ error: new Error('Requête invalide !')});
  }
}