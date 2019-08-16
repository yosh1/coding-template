const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'main': './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'js/bundle'),
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
};