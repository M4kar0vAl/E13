const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/new.ts',
    output: {
        filename: 'main.js'
    },
    devServer: {
        historyApiFallback: true,
        static: './dist',
        port: 3001,
        hot: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html'
        }),
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin(),
        new ESLintPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
    },
    module: {
        rules: [
            {
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
                    }
                }, 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
};