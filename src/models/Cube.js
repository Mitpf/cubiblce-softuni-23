const { Schema, model, Types: { ObjectId } } = require('mongoose');


const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    imageUrl: {
        type: String,
        required: true,
        //add vaidation http
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://');
            },
            message: 'URL is invalid!'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1,
    },
    accessories: [
        {
            type: ObjectId,
            ref: 'Accessory'
        }
    ],
    owner: {
        type: ObjectId,
        ref:'User'
    }
});

const Cube = model('Cube', cubeSchema);
module.exports = Cube;