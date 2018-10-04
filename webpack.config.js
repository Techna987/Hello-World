const path=require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  devServer:{
    contentBase: path.join(__dirname,'dist'),
    port: 8080,
    host: '127.0.0.1',
    proxy:
    {
      "*":{
        target: "http://127.0.0.1:3000",
      }
    }
    
  },

  plugins: [htmlPlugin]
};