const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');
const {product} = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { getProductsByUser } = require('../controllers/getProductController');
const {getProducts} = require('../controllers/seeProductController');

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../public/images'),
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'Stack', (err, user) => {
            if(err) {
                console.log('Error al verificar el token', err);
                return res.sendStatus(403);
            }
            console.log('Usuario decodificado:', user);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    
    }
}

router.get('/ping', ping);
router.post('/register', register);
router.post('/login', login);
router.post('/products', authenticateJWT ,upload.single('image'), product);
router.get('/users/products', authenticateJWT, getProductsByUser);
router.get('/products', getProducts);

module.exports = router;