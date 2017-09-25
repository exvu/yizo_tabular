const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); 
let path = require("path")
let rootPath = path.resolve(__dirname, './');
module.exports = {

    entry:rootPath+'/src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
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
            },
            {
                test: /.(png|gif|jpe?g)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                loaders:['style-loader', 'css-loader', 'autoprefixer-loader']
            },
            {
                test: /\.css$/,
                loader: 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader'],
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)$/,
                loader: "file-loader",
                query: {
                    name: 'font/[name].[hash:8].[ext]'
                }
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
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: ['.web.js', '.js']
   }
}