const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const ENV = (env) => {
  var ADMIN_APP_BASE_URL,
    ADMIN_APP_MQTT_HOST,
    ADMIN_APP_MQTT_USERNAME,
    ADMIN_APP_MQTT_PASSWORD,
    ADMIN_APP_MQTT_TOPICS;    
  if (env.local) {
    ADMIN_APP_BASE_URL = "http://localhost:9999/";
    ADMIN_APP_MQTT_HOST = "ws://emqx.deltaglobalnetwork.com:8083/mqtt";
    ADMIN_APP_MQTT_USERNAME = "frontend";
    ADMIN_APP_MQTT_PASSWORD = "abc123";
    ADMIN_APP_MQTT_TOPICS = ['admin/common','tenants/message','alarms/transformer/#','alarms/meter/#']
  } else if (env.prod) {
    ADMIN_APP_BASE_URL = "https://api-dev.deltaglobalnetwork.com/";
    ADMIN_APP_MQTT_HOST = "wss://emqx.deltaglobalnetwork.com:8084/mqtt";
    ADMIN_APP_MQTT_USERNAME = "frontend";
    ADMIN_APP_MQTT_PASSWORD = "abc123";
    ADMIN_APP_MQTT_TOPICS = ['admin/common','tenants/message','alarms/transformer/#','alarms/meter/#']
  } else {
    ADMIN_APP_BASE_URL = "https://api-dev.deltaglobalnetwork.com/";
    ADMIN_APP_MQTT_HOST = "wss://emqx.deltaglobalnetwork.com:8084/mqtt";
    ADMIN_APP_MQTT_USERNAME = "frontend";
    ADMIN_APP_MQTT_PASSWORD = "abc123";
    ADMIN_APP_MQTT_TOPICS = ['admin/common','tenants/message','alarms/transformer/#','alarms/meter/#']
  }
  return JSON.stringify({
    ADMIN_APP_BASE_URL,
    ADMIN_APP_MQTT_HOST,
    ADMIN_APP_MQTT_USERNAME,
    ADMIN_APP_MQTT_PASSWORD,
    ADMIN_APP_MQTT_TOPICS
  });
};

module.exports = (env) => ({
  entry: path.join(__dirname, "src", "index.js"),
  mode: env.local ? "development" : "production",
  devServer: {
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, "build"),
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|ico)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: "./index.html",
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
    new webpack.DefinePlugin({
      "process.env": ENV(env),
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    fallback: {
      url: require.resolve("url"),
      buffer: require.resolve("buffer"),
    },
  },
});
