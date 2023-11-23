const db = require('../db.json');

exports.getHomePage = (req, res) => {
    const { search, from: difficultyFrom, to: difficultyTo } = req.query;
    //const { search, from: difficultyFrom = 0, to: difficultyTo = Number.MAX_SAFE_INTEGER } = req.query;
    let cubes = db.cubes;

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }

    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }

    res.render('index', { cubes, search, difficultyFrom, difficultyTo });
}

exports.getAboutPage = (req, res) => {
    res.render('about');
}
exports.getErrorPage = (req, res) => {
    res.render('404');
}