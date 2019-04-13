const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authController = require('./auth');
const productController = require('./product');
const proposalController = require('./proposal');
const quotationController = require('./quotation');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authController);
app.use('/product', productController);
app.use('/proposal', proposalController);
app.use('/quotation', quotationController);

app.listen(8889, () => {
    console.log('Server listen on port 8889')
})