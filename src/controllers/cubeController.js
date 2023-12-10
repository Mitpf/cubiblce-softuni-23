const Cube = require('../models/Cube.js');
const Accessory = require('../models/Accessory.js');
const jwt = require('../lib/jsonwebtoken.js');
const config = require('../config/index.js');
const cubeService = require('../services/cubeService.js');
const cubeUtils = require('../utils/cubeUtils.js');
const mongoose = require('mongoose');

//named export

exports.getCreateCube = (req, res) => {
    res.render('cube/create');
};

exports.postCreateCube = async (req, res) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficultyLevel,
        owner: req.user._id
    });

    await cube.save();
    res.redirect('/');
};


exports.getDetails = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId)
        .populate('accessories')
        .lean();

    if (!cube) {
        return res.redirect('/404');
    }


    const isOwner = cubeUtils.isOwner(req.user, cube);

    res.render('cube/details', { cube, isOwner });
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

    if (!cubeUtils.isOwner(req.user, cube)) {
        throw new Error('you are not an owner')
    }

    res.render('cube/edit', { cube });
}


exports.postEditCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;


    await cubeService.update(req.params.cubeId, {
        name,
        description,
        imageUrl,
        difficultyLevel
    });

    res.redirect(`/cubes/${req.params.cubeId}/details`);
};

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    res.render('cube/delete', { cube });
}

exports.postDeleteCube = async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
}