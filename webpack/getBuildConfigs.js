const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const common = require('./common');

function makeDefinitions(definitionValues) {
    return Object.keys(definitionValues).reduce(
        (definitionObj, key) => Object.assign(definitionObj, { [key]: JSON.stringify(definitionValues[key]) }), {})
}

module.exports = function getBuildConfig(options) {
    const plugins = [];

    const definitions = options.definitions && makeDefinitions(options.definitions)
    if (definitions) {
        plugins.push(new webpack.DefinePlugin(definitions));
    }

    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new webpack.NamedChunksPlugin());

    plugins.push(new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].[chunkhash].css"
    }));

    if (options.sourceMap) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[name].[chunkhash].js.map',
            include: [/app/]
        }));
    }

    plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
    }));

    plugins.push(new InlineManifestWebpackPlugin())

    plugins.push(new CopyWebpackPlugin([
        { from: './static' }
    ]));

    if (options.compression) {
        plugins.push(new CompressionPlugin({
            test: /\.(js$|css)/,
            exclude: /\.map/,
            deleteOriginalAssets: true,
            cache: true
        }));
    }

    plugins.push(new WorkboxPlugin.GenerateSW({
        navigateFallback: '/static/index.html',
        runtimeCaching: [
            {
                urlPattern: /\.*/,
                handler: 'networkFirst'
            }
        ],
        clientsClaim: true,
        skipWaiting: true,
    }));

    return ({
        mode: 'production',
        stats: {
            colors: true,
            entrypoints: false,
            children: false,
            modules: false
        },
        entry: {
            app: './src/index'
        },
        output: {
            publicPath: '/static/',
            path: path.join(__dirname, '..', 'dist', 'static'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        optimization: {
            concatenateModules: true,
            noEmitOnErrors: true,
            namedModules: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    sourceMap: options.sourceMap,
                    parallel: true
                })
            ],
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'all',
                        maxSize: 2440000,
                        enforce: true
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'resolve-url-loader',
                        }, {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, 'src')]
                            }
                        }
                    ]
                }, {
                    test: /\.(less)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'resolve-url-loader',
                        }, {
                            loader: 'less-loader',
                            options: common.lessLoaderOptions
                        }
                    ]
                },
                common.modules.rules.typescript,
                common.modules.rules.fonts,
                common.modules.rules.images
            ]
        },
        resolve: common.resolve
    })
}