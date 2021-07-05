const userController = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

userController.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const verifyMail = await User.findOne({ email });
    if (verifyMail)
      res.status(400).json({ message: 'El email ya esta en uso' });
    else {
      const newUser = new User({ username, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.status(201).json({ message: 'user added succesfully', newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Ops algo salio mal' });
  }
};

userController.logIn = async (req, res) => {
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
        const token = await jwt.sign({ userDB }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        res.status(202).json({ token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Ops algo salio mal' });
  }
};

userController.authenticate = async (req, res) => {
  try {
    res.status(200).json({ message: 'Usuario validado correctamente' });
  } catch (error) {
    res.status(401).json({ message: 'Usuario invalido' });
  }
};

module.exports = userController;
