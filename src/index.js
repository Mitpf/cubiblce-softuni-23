const express = require('express');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware.js');

const initDatabase = require('./config/databaseInit.js');

const routes = require('./routes.js');
const app = express();
const config = require('./config');
const setupViewEngine = require('./config/viewEngine.js');
setupViewEngine(app);
//require('./config/viewEngine.js')(app)//ugly code

app.use(express.static('src/public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware.authentication);
app.use(routes);

initDatabase()
    .then(
        () => app.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}`))
    )
    .catch((err) => console.log(err));