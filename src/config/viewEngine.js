const handlebars = require('express-handlebars');
const helpers = require('../helpersHBS/helpers.js');

function setupViewEngine(app) {

    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        helpers
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = setupViewEngine;

/* function setupViewEngine(app) {
    const hbs = handlebars.create({
        extname: 'hbs',
        helpers,
    });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}
 */



