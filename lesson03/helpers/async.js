const util = require('util');
const fs = require('fs');

module.exports = {
    readDir: util.promisify(fs.readdir),
    readFile: util.promisify(fs.readFile),
    writeFile: util.promisify(fs.writeFile)
};