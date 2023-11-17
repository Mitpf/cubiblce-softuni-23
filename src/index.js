const express = require('express');
const config = require('./config.js');


const app = express();

app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}`) );