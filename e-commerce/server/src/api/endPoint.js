const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');
const {product} = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../public/images'),
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})

router.get('/ping', ping);
router.post('/register', register);
router.post('/login', login);
router.post('/products', upload.single('image'), product);

module.exports = router;