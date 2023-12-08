
const router = require('express').Router();
const accessoryController = require('./controllers/accessoryController.js');
const cubeController = require('./controllers/cubeController.js');
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const { isAuthenticated } = require('./middlewares/authMiddleware.js');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('/404', homeController.getErrorPage);


router.get('/cubes/create', isAuthenticated, cubeController.getCreateCube);
router.post('/cubes/create', isAuthenticated, cubeController.postCreateCube);
router.get('/cubes/:cubeId/details', cubeController.getDetails);
router.get('/cubes/:cubeId/edit', isAuthenticated, cubeController.getEditCube);
router.post('/cubes/:cubeId/edit', cubeController.postEditCube);
router.get('/cubes/:cubeId/delete', cubeController.getDeleteCube);
router.post('/cubes/:cubeId/delete', cubeController.postDeleteCube);

router.get('/cubes/:cubeId/attach', isAuthenticated, cubeController.getAttachAccessory);
router.post('/cubes/:cubeId/attach', isAuthenticated, cubeController.postAttachAccessory);


router.use('/accessories', accessoryController);

router.use('/', authController);

router

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