const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// https://mongoosejs.com/docs/api/schema.html#Schema.prototype.pre()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
        minLength: [6,'password is too short, min 6 characters!'],
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});
const User = mongoose.model('User', userSchema);

module.exports = User;

