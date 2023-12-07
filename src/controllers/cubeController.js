const Cube = require('../models/Cube.js');
const Accessory = require('../models/Accessory.js');
const jwt = require('../lib/jsonwebtoken.js');
const config = require('../config/index.js');
const cubeService = require('../services/cubeService.js');

const mongoose = require('mongoose');
//named export
exports.getCreateCube = (req, res) => {
    res.render('create');
};

exports.postCreateCube = async (req, res) => {

    console.log('req.user', req.user);

    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube({ name, description, imageUrl, difficultyLevel });

    await cube.save();
    res.redirect('/');
};


exports.getDetails = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
    //console.log(cube);
    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', cube);
};

exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();

    res.render('cube/attach', { cube, accessories });
};

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryID = req.body.accessory;
    cube.accessories.push(accessoryID);

    await cube.save();
    res.redirect(`/cubes/${req.params.cubeId}/details`);
}

exports.getEditCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    res.render('cube/edit', { cube });
}

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);

    res.render('cube/delete', { cube });
}