const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = (env) => {
  var ADMIN_APP_BASE_URL;
  const isDev = env == 'development';
  //Function to handle API access url based on environment
  var setAPI = function () {  
    if(env.local) ADMIN_APP_BASE_URL = "'http://localhost:9999/'";
    else if(env.prod) ADMIN_APP_BASE_URL = "'https://api-dev.deltaglobalnetwork.com/'";
    else if(env.dev) ADMIN_APP_BASE_URL = "'https://api-dev.deltaglobalnetwork.com/'";
    else if(env.qa) ADMIN_APP_BASE_URL = "'https://api-dev.deltaglobalnetwork.com/'";
    else ADMIN_APP_BASE_URL = "'https://api-dev.deltaglobalnetwork.com/'";   
  }

  setAPI();
  return {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    devServer:{
      port: 3000,
    },
    output: {
      path:path.resolve(__dirname, "build"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: ["style-loader", "css-loader","sass-loader"],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif|ico)$/,
          use: ['file-loader'],
        },      
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        filename: './index.html',
        favicon: './public/favicon.ico',
        manifest: "./public/manifest.json"
      }),
      new webpack.DefinePlugin({
        ADMIN_APP_BASE_URL: ADMIN_APP_BASE_URL,
      })
    ],
  }
}