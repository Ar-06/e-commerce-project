const connection = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { user, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';

    try {
        connection.query(query, [user], (error, results) => {
            if (error) {
                return res.send(error);
            }

            if (results.length > 0) {
                const storedHash = results[0].password;
                
                bcrypt.compare(password, storedHash, (err, isMatch) => {
                    if (err) {
                        return res.send(err);
                    }

                    if (isMatch) {
                        const token = jwt.sign({ user: user }, 'Stack', {
                            expiresIn: '5h'
                        });

                        res.send({ message: 'Bienvenido', token: token });
                    } else {
                        res.send({ message: 'Usuario o contraseña incorrectos' });
                    }
                });
            } else {
                res.send({ message: 'Usuario no encontrado' });
            }
        });
    } catch (e) {
        res.send(e);
    }
};
