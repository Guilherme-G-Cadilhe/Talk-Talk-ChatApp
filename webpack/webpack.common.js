const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/renderer/index.jsx', // Arquivo JS Web Principal ( Base inicial Root )
  devtool: 'inline-source-map', // Mapea a ligação entre o arquivo compilado e o normal para ajudar no DevTools
  target: 'electron-renderer', // Definição do sistema alvo
  module: { // Modulos de configuração do seu ambiente
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Cria `style` nodes apartir de strings de JS
          'style-loader',
          // Traduz CSS em CommonJS
          'css-loader',
          // Compila Sass para CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: { // Adiciona os tipos de extensões JS utilizadas
    extensions: ['.js', '.jsx'],
  },
  output: { // Onde será criado o arquivo js do resultado compilado
    filename: 'app.js',
    path: path.resolve(__dirname, '..', 'build', 'js'), // {repo}/build/js/app.js
  },
};