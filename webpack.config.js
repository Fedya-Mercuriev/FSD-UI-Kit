'use strict';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (_, argv) => {
    const config = {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js'
        },
        module: {
            rules: [{
                    test: /\.pug$/,
                    use: ['html-loader?attrs=false', 'pug-html-loader']
                },
                {
                    test: /\.scss$/,
                    use: [{
                            loader: argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['node_modules/normalize-scss/sass'],
                                data: `
                                 @import './src/scss/scss-assets/_variables.scss';
                                 @import './src/scss/scss-assets/_mixins.scss';
                                 @import './src/scss/scss-assets/_functions.scss';
                                 @import './src/scss/scss-assets/_config.scss';
                                 `
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'assets/[hash].[ext]'
                        }
                    }]
                },
            ]
        },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin({
                dry: true
            }),
            new MiniCssExtractPlugin({
                filename: 'common.[contenthash].css',
                disable: false,
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: true,
                hash: true,
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    charset: 'utf-8'
                },
                template: 'src/index.pug',
            }),
            new WebpackMd5Hash()
        ]
    };

    return config;
};