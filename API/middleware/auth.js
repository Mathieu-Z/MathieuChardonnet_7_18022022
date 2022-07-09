const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  console.log("auth", authHeader)
  if (!authHeader){
    return res.status(401).json({ error: 'token inexistant' });
  }

  const [, token] = authHeader.split(' ');
  console.log("token", token)
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      'RANDOM_TOKEN_SECRET'
    );
      console.log(decoded);
    req.auth = { userId: decoded.userId };
    console.log(req.auth);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token non valide.' });
  }
};

/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);
    console.log(req.body.userId);
    if (parseInt(req.body.userId) == parseInt(userId)) {
      //console.log(parseInt(req.body.userId) == parseInt(userId))
      return next();
    }
  } catch (error){
    console.log(error);
    return res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};*/