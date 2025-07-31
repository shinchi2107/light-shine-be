const { apiResponse } = require('./response/api');
const middleware = {
    common: {
        before: [

        ],
        after: [
            ((err, req, res, next) => {
                if (req.headers['content-type'] === 'application/json') {
                    res.status(500).send({
                        message: err.message || "Internal Server Error"
                    });
                } else {
                    res.status(500).send("Internal Server Error")
                }
                next()
            })
        ]
    },
    api: [
        async (req, res, next) => {
            next();
        },
        apiResponse
    ]
}

module.exports = { middleware };