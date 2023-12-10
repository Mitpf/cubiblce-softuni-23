exports.handleRequest = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        }
        catch (err) {
            next(err);
        }
    }
};


/* exports.handleRequest = (handler) => {
    return async (req, res, next) => {
        try {
            if (typeof handler === 'function') {
                // Individual route handler
                await handler(req, res, next);
            } else if (typeof handler === 'object' && typeof handler.handle === 'function') {
                // Grouped router
                await handler(req, res, next);
            } else if (typeof handler === 'function' && handler.length === 4) {
                // Handle express error middleware directly
                await handler(req, res, next);
            } else {
                throw new Error('Invalid handler type');
            }
        } catch (err) {
            next(err);
        }
    };
}; */