const Cube = require('../models/Cube.js');


exports.getOne = (cubeId) => Cube.findById(cubeId);


exports.update = (cubeId, data) => Cube.findByIdAndUpdate(cubeId, data, { runValidators: true });