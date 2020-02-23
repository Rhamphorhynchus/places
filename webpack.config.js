// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

const webpack = require('webpack');

module.exports = {
    entry: { main: './src/script/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules        
        },
        {
            test: /\.css$/, // применять это правило только к CSS-файлам
            use: [MiniCssExtractPlugin.loader, 'css-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
        },
        /*{
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                    'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                            loader: 'image-webpack-loader',
                            options: {}
                    },
            ]
        },*/
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            options: {
              digest: 'hex',
              hash: 'sha512',
              name: 'images/[hash].[ext]',
              esModule: false,
            },
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        },
     /*   {
            test: /\.css$/i,
            use: [
                            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                            'css-loader', 
                            'postcss-loader'
                ]
        }*/]
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css',}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
          }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
// module.exports — это синтаксис экспорта в Node.js
// указали первое место куда заглянет webpack — файл script.js в папке src/script/
// указали в какой файл будет собирться весь js и дали ему имя
// переписали точку выхода, используя утилиту path