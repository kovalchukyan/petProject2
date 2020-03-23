const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = Promise;
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;

database.once('open', () => {
    console.log('Database is working...')
});

database.on('error', () => {
    console.log('Database error!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/', routes);

app.listen(config.PORT, () => {
    console.log('Server is working on 8080 port...')
});