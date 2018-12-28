const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        'API_ENTRY': 'http://v2-api.furnituremaker.vn',
        'FILE_HOST': 'http://v2-api.furnituremaker.vn'
    },
    sourceMap: true,
    compression: true
})