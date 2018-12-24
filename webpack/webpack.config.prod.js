const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        API_ENTRY: 'http://203.162.120.7:8686'
    },
    sourceMap: true,
    compression: true
})