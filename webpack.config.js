const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry: {
    main: './src/scripts/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },

  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },

  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,      // регулярное выражение, которое ищет все файлы с указанными расширениями
        type: 'asset/resource'
      },
      {
        test: /\.css$/,                                         // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, {                    // при их обработке использовать MiniCssExtractPlugin.loader и css-loader
            loader: 'css-loader',
            options: {                                          //
              importLoaders: 1                                  // обязательная опция подключения css-loader при использовании директивы @import в css
            }                                                   //
          },
          'postcss-loader'                                      //подключение плагина postcss-loader
        ]
      },
    ]
  },

  devtool: 'source-map',                                        //подключение source-map для сопоставления исходного кода и упрощения отладки

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
}