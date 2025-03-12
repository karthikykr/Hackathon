const { sign } = require('jsonwebtoken');

const createJSONToken = (payload, key, time) => {
    return sign(payload, key, { expiresIn: time });
};

module.exports = {
    createJSONToken,
};
