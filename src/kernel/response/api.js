const { sanitize } = require('@utils/xss');
const { handle } = require('@iKernel/interface/apis');


const apiResponse = (req, res, next) => {
    const format = (data) => {
        if (!req.ignoreXss) {
            sanitize(data, {})
        }
        const message = handle(res.statusCode, data);
        return message
    }

    res.sendData = (data = null) => {
        const formattedData = format(data)
        res.json(formattedData)
    }
    next();
}

module.exports = { apiResponse };