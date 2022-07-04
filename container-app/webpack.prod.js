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
      publicPath: "https://mf-container-app.vercel.app/",
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
          Header: "header@https://mf-header-app.vercel.app/remoteEntry.js",
          Employee: "employee@https://mf-employee-app.vercel.app/remoteEntry.js",
          UIComponents: "ui_components@https://mf-ui-components.vercel.app/remoteEntry.js",
          History: "logger@https://mf-history-app.vercel.app/remoteEntry.js",
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
