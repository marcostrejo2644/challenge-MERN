const router = require('express').Router();
const { logIn, authenticate } = require('../services/user.service');
const validateSchema = require('../controllers/user-validate/validate.function');
const validateToken = require('../controllers/token-validate/token.validate');
const confirmToken = require('../controllers/token-validate/token.confirmation');
const tokenM = [validateToken, confirmToken];
const {
  logUser: logUserVal,
} = require('../controllers/user-validate/user.schema');

router.post('/', validateSchema(logUserVal), logIn);

router.post('/auth', tokenM, authenticate);

module.exports = router;
