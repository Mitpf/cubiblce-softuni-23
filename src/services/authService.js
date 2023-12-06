const config = require('../config');
const jwt = require('../lib/jsonwebtoken.js');

const User = require('../models/User.js');

// asynchronious function
exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);
    const isValid = await user.validatePassword(password);
    if (!user || !isValid) {
        throw 'invalid username or password';
    }

    const payload = { username: user.username };
    const token = await jwt.sign(payload, config.SECRET, { expiresIn: '2h' });
    return token;
};