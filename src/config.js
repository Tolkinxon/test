const config = require("config");

const serverConfig = {
    PORT: config.get('PORT') || 40000
}

module.exports = { serverConfig };