const router = require('express').Router();
const validateSchema = require('../controllers/user-validate/validate.function');
const {
  addUser: addUserVal,
} = require('../controllers/user-validate/user.schema');
const { addUser } = require('../controllers/user.controller');

router.post('/add-user', validateSchema(addUserVal), addUser);

module.exports = router;
