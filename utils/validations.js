const validations = (req, res, next) => {
    let limit = new Number(req.query.limit);
    if (!limit) {
        limit = 1;
    }
    if (limit > 100) {
        throw new Error('Requested too many records. You can request up to 100 pizza orders')
    }
    res.locals.limit = limit
    next();
}


module.exports = validations;