const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/companies', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('DataBase Connection Established!'));

app.use(express.json());

const companiesRouter = require('./routes/companies');
app.use('/companies', companiesRouter); 



app.listen(5000, () => console.log('Server is Running!'));