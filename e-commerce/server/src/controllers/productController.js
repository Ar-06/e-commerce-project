const connection = require('../models/db');

module.exports.product = (req, res) => {
    const {name, description, price, stock} = req.body;

    if(!req.file) {
        return res.status(400).json({ message: 'Falta la imagen del producto' });
    }

    const image = req.file.filename;

    const query = 'INSERT INTO products (name, description, price, stock, image) VALUES (?,?,?,?,?)';
    
    connection.query(query, [name, description, price, stock, image], (error, results) => {
        if (error) {
            console.error('Error al agregar producto', error);
            return res.status(400).json({ message: 'Error al agregar producto' });
        }
        res.status(201).json({ message: 'Producto agregado' });
    })
}

