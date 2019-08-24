const path = require(`path`);

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
  }
};

