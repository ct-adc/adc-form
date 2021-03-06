/**
 * @author rubyisapm
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        index:'./src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name].js',
        library:'ct-adc-form',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.css$/,
                loader: 'css-loader'
            },{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'css':'vue-style-loader!css-loader',
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            }
        ]
    },
    resolve: {
        modules:[path.resolve(__dirname, 'src/js/component'),path.resolve(__dirname, 'src/js/module'),'node_modules'],
        extensions: ['.js', '.json','.vue','.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};