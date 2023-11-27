//const Cube = require('../models/Cube_old.js');
const Cube = require('../models/Cube');
const db = require('../db.json');

//named export
exports.getCreateCube = (req, res) => {
    res.render('create');
};
exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save();
    res.redirect('/');
};


exports.getDetails = async (req, res) => {
    let cubeId = Number(req.params.cubeId);

    if (!cubeId) {
        return res.redirect('/404');
    }

    let cube = await Cube.findById(cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }
    console.log('cuuuuuuube', cube)
    res.render('details', cube);
};



/* module.exports={
    getCreateCube
}; */