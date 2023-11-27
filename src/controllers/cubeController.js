const Cube = require('../models/Cube_old.js');
const db = require('../db.json');

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


exports.getDetails = (req, res) => {
    let cubeId = Number(req.params.cubeId);

    if (!cubeId) {
        return res.redirect('/404');
    }

    let cube = db.cubes.find(x => x.id === cubeId);

    if (!cube) {
        return res.redirect('/404');
    }
    console.log('cuuuuuuube', cube)
    res.render('details', cube );
};



/* module.exports={
    getCreateCube
}; */