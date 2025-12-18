const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    electronica: './src/js/electronica.js',
    muebles: './src/js/muebles.js',
    decoracion: './src/js/decoracion.js',
    cesta: './src/js/cesta.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']  // ← Esto ya lo tienes
    }
  ]
},
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/electronica.html',
      filename: 'electronica.html',
      chunks: ['electronica'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/muebles.html',
      filename: 'muebles.html',
      chunks: ['muebles'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/decoracion.html',
      filename: 'decoracion.html',
      chunks: ['decoracion'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/cesta.html',
      filename: 'cesta.html',
      chunks: ['cesta'],
      inject: true
    })
  ],
  devServer: {
    static: './dist',
    port: 8081,
    open: true,
    hot: true
  }
};