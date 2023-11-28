//const Cube = require('../models/Cube_old.js');
const Cube = require('../models/Cube');


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
    const cube = await Cube.findById(req.params.cubeId);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', cube);
};



/* module.exports={
    getCreateCube
}; */