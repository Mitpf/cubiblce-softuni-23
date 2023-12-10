//next for some cases
const errorHandler = (err, req, res, next) => {
    console.log('error Middleware:', err);

    res.status(404).render('404', { error: err.message });
}

module.exports = errorHandler;