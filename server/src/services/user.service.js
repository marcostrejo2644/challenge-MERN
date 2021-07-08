const userService = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

userService.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (!userDB) {
      res.status(404).send('Usuario no encontrado');
    } else {
      const matchPassword = await userDB.comparePassword(password);
      if (matchPassword === false) {
        res.sendStatus(401).send('Passord Incorrect');
      } else {
        const token = jwt.sign({ userDB }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        const username = userDB.username;
        res.status(202).json({ token, username });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Ops algo salio mal' });
  }
};

userService.authenticate = async (req, res) => {
  try {
    res.status(200).json({ message: 'Usuario validado correctamente' });
  } catch (error) {
    res.status(401).json({ message: 'Usuario invalido' });
  }
};

module.exports = userService;
