const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    sourceMap: false,
    compression: false,
    analyzer: true
})