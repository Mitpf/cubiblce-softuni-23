const Cube = require('../models/Cube.js');


//named export
exports.getCreateCube = (req, res) => {
    res.render('create');
};
exports.postCreateCube = async (req, res) => {
    let cube = new Cube(req.body);
    await Cube.save(cube);
    res.redirect('/');
};

/* module.exports={
    getCreateCube
}; */