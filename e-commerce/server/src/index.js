const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;
const routes = require('./api/endPoint');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST']
}))


app.use(morgan('dev'));

app.use('/', routes);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})