const accessoryController = require('./controllers/accessoryController.js');
const cubeController = require('./controllers/cubeController.js');
const homeController = require('./controllers/homeController.js');

const router = require('express').Router();


router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('/404', homeController.getErrorPage);


router.get('/cubes/create', cubeController.getCreateCube);
router.post('/cubes/create', cubeController.postCreateCube);
router.get('/cubes/:cubeId/details', cubeController.getDetails);

router.get('/cubes/:cubeId/attach', cubeController.getAttachAccessory);
router.post('/cubes/:cubeId/attach', cubeController.postAttachAccessory);


router.use('/accessories', accessoryController);

module.exports = router;

/* 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/create', cubeController.getCreateCube);

app.get('/details/:id', (req, res) => {
    res.render('details');
});
*/