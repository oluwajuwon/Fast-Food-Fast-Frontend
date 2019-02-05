const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|JPG)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: './public/index.html',
    },
  )],
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 5000,
    historyApiFallback: true,
  },
};
