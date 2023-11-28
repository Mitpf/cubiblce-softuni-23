router = require('express').Router();
const Accessory = require('../models/Accessory.js');

// URL: /accessory/create
router.get('/create', (req, res) => {

    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    console.log(name, description, imageUrl)
    // const accesory=new Accessory({name, description, imageUrl});
    await Accessory.create({ name, description, imageUrl });
    res.redirect('/')
});

module.exports = router;