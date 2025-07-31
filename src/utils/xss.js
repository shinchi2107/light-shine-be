const { FilterXSS } = require("xss");

const sanitize = (obj, options = {}) => {
    const xssFilter = new FilterXSS(options);
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = xssFilter.process(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitize(obj[key], options);
        }
    }
};

module.exports = { sanitize };