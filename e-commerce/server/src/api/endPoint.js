const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');


router.get('/ping', ping);
router.post('/register', register);
router.post('/login', login);


module.exports = router;