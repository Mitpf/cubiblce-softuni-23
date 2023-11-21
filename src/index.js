const express = require('express');
const app = express();
const config = require('./config');
const setupViewEngine = require('./config/viewEngine.js');
setupViewEngine(app);
//require('./config/viewEngine.js')(app)//ugly code

app.use(express.static('src/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}`));