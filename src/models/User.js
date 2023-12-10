const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// https://mongoosejs.com/docs/api/schema.html#Schema.prototype.pre()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5,'min length of username 5 characters!'],
        unique: true,
        //validate:/^[a-zA-z0-9]+$/
        validate: {
            validator: function (value) {
                return /^[a-zA-z0-9]+$/.test(value);
            },
            message: 'name should be only english words'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'password is too short, min 8 characters!'],
        validate:/^[a-zA-z0-9]+$/

    },

});
/*
in shema:
validate:{
            vаlidator: function (value){
                
            }
        }
or outside the shemma
userSchema.path('username').validator('');
 */
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', async function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;

