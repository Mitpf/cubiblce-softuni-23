const router = require('express').Router();
const authService = require('../services/authService.js');
const { parseMongooseError } = require('../utils/errUtils.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });
    }
    catch (err) {
        console.log(err.message);
        return res.render('auth/login', { error: err.message });
    }

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        //return next(new Error('password missmatch!'));
        //res.render('auth/register', { error: 'Password missmatch!' });
        //throw new Error('passwords dont match!');
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {

        return res.render('auth/register', { error: 'user already exists' });
    }

    try {
        const user = await authService.register(username, password);
    } catch (err) {
        console.log(err.message);
        const errors = parseMongooseError(err);
        return res.render('auth/register', { error: errors[0] })
        //return next(err);
    }



    res.redirect('./login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;