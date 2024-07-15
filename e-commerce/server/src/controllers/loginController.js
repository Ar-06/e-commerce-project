// loginController.js (Backend)

const connection = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { user, password } = req.body;

    const query = 'SELECT username, password, role FROM users WHERE username = ?';

    try {
        connection.query(query, [user], (error, results) => {
            if (error) {
                console.error('Error al buscar usuario en la base de datos', error);
                return res.status(500).json({ message: 'Error al buscar usuario en la base de datos' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const storedHash = results[0].password;
            const role = results[0].role; // Obtener el rol del usuario desde la base de datos

            bcrypt.compare(password, storedHash, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas', err);
                    return res.status(500).json({ message: 'Error al comparar contraseñas' });
                }

                if (isMatch) {
                    const { username } = results[0];

                    // Generar el token JWT con el usuario y rol
                    const token = jwt.sign({ user: username, role: role }, 'Stack', {
                        expiresIn: '1h' // Tiempo de expiración del token ajustado a 1 hora
                    });

                    res.status(200).json({ message: 'Bienvenido', token: token, role: role });
                } else {
                    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
                }
            });
        });
    } catch (e) {
        console.error('Error en el controlador de login', e);
        res.status(500).json({ message: 'Error en el servidor al procesar la solicitud' });
    }
};
