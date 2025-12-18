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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/electronica.html',
      filename: 'electronica.html',
      chunks: ['electronica']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/muebles.html',
      filename: 'muebles.html',
      chunks: ['muebles']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/decoracion.html',
      filename: 'decoracion.html',
      chunks: ['decoracion']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/cesta.html',
      filename: 'cesta.html',
      chunks: ['cesta']
    })
  ],
  devServer: {
    static: './dist',
    port: 8080,
    open: true,
    hot: true
  }
};