const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const common = require('./common');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
        `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/index',
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'API_ENTRY': JSON.stringify('http://v2-api.furnituremaker.vn'),
            'FILE_HOST': JSON.stringify('http://v2-api.furnituremaker.vn')
        }),
        new ErrorOverlayPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss|less)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: 'css-loader',
                }, {
                    loader: "resolve-url-loader",
                    options: {
                        silent: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [path.resolve(process.cwd(), 'src')]
                    }
                }]
            }, {
                test: /(\.less)$/,
                loader: 'less-loader',
                options: common.lessLoaderOptions
            },
            common.modules.rules.typescript,
            common.modules.rules.fonts,
            common.modules.rules.images
        ]
    },
    resolve: {
        ...common.resolve,
        alias: {
            'react-dom': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        }
    }
};