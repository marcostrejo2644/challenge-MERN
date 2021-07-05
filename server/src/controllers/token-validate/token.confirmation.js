const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.token, process.env.JWT_SECRET);
    const { email } = decoded.userDB;
    const userDB = await User.findOne({ email });
    if (userDB !== null && decoded.userDB.password === userDB.password) {
      next();
    } else {
      res.status(422);
    }
  } catch (error) {
    res.status(401).json({ message: 'Usuario Invalido' });
    console.log(error);
  }
};
