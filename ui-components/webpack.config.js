const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3003,
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:3003/",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,

      },
      {
        test: /\.css?$/,
        loader: "css-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ui_components",
      filename: "remoteEntry.js",
      exposes: {
        // expose each component
        "./App": "./src/App",
        "./Button": "./src/components/Button",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "static",
    }),
  ],
};
