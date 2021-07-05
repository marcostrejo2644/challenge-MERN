const router = require('express').Router();
const validateSchema = require('../controllers/user-validate/validate.function');
const validateToken = require('../controllers/token-validate/token.validate');
const confirmToken = require('../controllers/token-validate/token.confirmation');
const tokenM = [validateToken, confirmToken];
const {
  addUser: addUserVal,
  logUser: logUserVal,
} = require('../controllers/user-validate/user.schema');
const {
  addUser,
  logIn,
  authenticate,
} = require('../controllers/user.controller');

router.post('/add-user', validateSchema(addUserVal), addUser);

router.post('/login', validateSchema(logUserVal), logIn);

router.post('/auth', tokenM, authenticate);

module.exports = router;
