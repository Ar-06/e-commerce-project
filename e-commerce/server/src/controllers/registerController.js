const connection = require('../models/db');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    // Número de rondas para generar la sal (puedes ajustarlo según tus necesidades)
    const saltRounds = 10;

    // Hashear la contraseña antes de insertarla en la base de datos
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error al hashear la contraseña' });
        }

        const query = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;

        try {
            connection.query(query, [user, email, hash], (error, results) => {
                if (error) {
                    res.status(400).json({ message: 'Error en registrar usuario' });
                } else {
                    res.status(201).json({ message: 'Usuario registrado' });
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    });
};
