const Cube = require('../models/Cube.js');


//named export
exports.getCreateCube = (req, res) => {
    res.render('create');
};
exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    console.log(req.body);
    await Cube.save(cube);
    res.redirect('/');
};

/* module.exports={
    getCreateCube
}; */