const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log({ isProduction });
  return {
    entry: "./src/index.js",
    mode: "production",
    output: {
      publicPath: "http://localhost:3000/",
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
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          Header: "header@http://localhost:3001/remoteEntry.js",
          Employee: "employee@http://localhost:3002/remoteEntry.js",
          UIComponents: "ui_components@http://localhost:3003/remoteEntry.js",
          History: "logger@http://localhost:3004/remoteEntry.js",
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
};
