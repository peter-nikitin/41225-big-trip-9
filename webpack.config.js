const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  devtool: `source-map`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`]
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
