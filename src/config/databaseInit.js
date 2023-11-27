const mongoose = require('mongoose');

const config = require('./index.js');

async function initDatabase() {
    //mongoose.set('strictQuery', false); default is false

    await mongoose.connect(config.DB_URI);

    console.log('DB connected');
}

module.exports = initDatabase;