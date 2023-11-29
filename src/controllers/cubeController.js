//const Cube = require('../models/Cube_old.js');
const Cube = require('../models/Cube.js');
const Accessory = require('../models/Accessory.js');


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
    const cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
    console.log(cube);
    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', cube);
};

exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find().lean();
    console.log(accessories);
    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryID = req.body.accessory;
    cube.accessories.push(accessoryID);

    await cube.save();
    res.redirect(`/cubes/${req.params.cubeId}/details`);
}