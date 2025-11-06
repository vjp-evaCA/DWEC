'use strict';

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
  entry: {
    index: './src/ejercicio2.ts',
  },
  /*devtool: 'inline-source-map',*/ // Añadir sólo en caso de querer depurar con ts
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // <-- fichero termina en .ts
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // <-- Más reglas de loaders aquí (por ejemplo CSS)
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
};
