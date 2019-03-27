const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack/webpack.config.dev')

const port = process.env.npm_package_config_port || 3001
const host = process.env.npm_package_config_host || 'localhost'

console.info(`Dev server starting at: ${__dirname}`);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        chunks: false,
    },
    overlay: true
}).listen(port, host, function(err) {
    if (err) {
        console.log(err);
    }

    console.info(`Listening at: http://${host}:${port}/`);
});