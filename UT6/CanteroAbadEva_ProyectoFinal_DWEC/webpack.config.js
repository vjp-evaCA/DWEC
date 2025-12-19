const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  clean: true,
  publicPath: 'auto'  
},
  module: {
    rules: [
      // REGLA PARA JAVASCRIPT (ES6 modules)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // REGLA PARA CSS (ya la tienes)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // REGLA PARA IMÁGENES
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  // AÑADE esta configuración para manejar assets
  experiments: {
    asset: true  // Habilita asset modules
  },
  plugins: [
    new CopyWebpackPlugin({
    patterns: [
      {
        from: 'src/images',  // Carpeta origen
        to: 'images',        // Carpeta destino en dist/
        globOptions: {
          ignore: ['**/*.js', '**/*.css']  // Ignora archivos no-imagen
        }
      }
    ]
  }),
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