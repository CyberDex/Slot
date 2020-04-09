const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path')
const build = require('../build.json')

module.exports = {
    entry: build.entryPoint,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new HardSourceWebpackPlugin()
    ]
}