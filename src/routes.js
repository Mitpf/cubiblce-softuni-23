const cubeController = require('./controllers/cubeController.js');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/create', cubeController.getCreateCube);

router.get('/details/:id', (req, res) => {
    res.render('details');
});


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