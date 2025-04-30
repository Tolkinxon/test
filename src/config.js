const config = require("config");
const path = require('path');

const serverConfig = {
    PORT: config.get('PORT') || 40000,
    dbPath: (fileName) => path.join(process.cwd(), "db", fileName + '.json')
}


module.exports = { serverConfig };