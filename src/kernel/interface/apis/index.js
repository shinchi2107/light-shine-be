const { content, message } = require('./structure');

const handle = (status, data = null) => {
    const result = { ...message };
    const founder = content.find((msg) => msg.status == status);
    if (founder) {
        result.meta.content = founder.metaData;
        result.meta.code = founder.status;
        result[founder.typeMessage] = data;
    }
    return result;
}

module.exports = { handle };