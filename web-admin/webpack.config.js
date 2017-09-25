const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); 
let path = require("path")
let rootPath = path.resolve(__dirname, './');
module.exports = {

    entry:rootPath+'/src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[Hash].js",
        publicPath: "/",
        chunkFilename: "js/[name].[chunkhash:8].bundle.js"
    },
    devServer: {
        port: 8888,
        contentBase: "./dist",
        historyApiFallback: true,
        publicPath: "/",
        hot: true
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'yizo',
            template: './src/sources/index.template.html',
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}