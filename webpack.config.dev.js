
module.exports = {
  mode: 'development',
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
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 5000,
    historyApiFallback: true,
  },
};
