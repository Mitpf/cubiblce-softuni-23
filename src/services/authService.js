const User = require('../models/User.js');

// asynchronious function
exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });
