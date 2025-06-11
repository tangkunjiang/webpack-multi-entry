const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: {
        com1: {
            import: './test.vue',
            // runtime: 'com1-runtime'
        },
        com2: {
            import: './test2.vue',
            // runtime: 'com2-runtime' 
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            name: ['share', '[name]'],
            type: 'var'
        },
    },
    externals: {
        vue: 'Vue'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出',
            template: './public/index.html',
            chunks: ['sub1', 'sub2', 'com1', 'com2']
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        static: './dist',
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        allowedHosts: 'all',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ]
    },
};