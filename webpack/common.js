const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    lessLoaderOptions: {
        paths: [path.resolve(__dirname, "node_modules")],
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#0C66FF'
        }
    },
    modules: {
        rules: {
            typescript: {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory( /** options */)]
                        })
                    }
                }, {
                    loader: 'ts-nameof-loader'
                }],
                exclude: /node_modules/
            },
            fonts: {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },
            images: {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }
        }
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
}