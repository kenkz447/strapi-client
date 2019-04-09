const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        'API_ENTRY': 'http://admin.mfurniture.vn',
        'FILE_HOST': 'http://admin.mfurniture.vn'
    },
    sourceMap: true,
    compression: true
})