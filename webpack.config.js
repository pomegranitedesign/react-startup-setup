const path = require("path");
const Webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {
  return {
    // Mode
    mode: env.mode,

    // Entry
    entry: "./src/index.js",

    // Output
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.[hash].js"
    },

    // Module
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },

        {
          test: /\.(css|scss|sass)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /node_modules/
        },

        {
          test: /\.(png|svg|gif|jpg|jpeg)$/,
          loader: "file-loader",
          exclude: /node_modules/
        }
      ]
    },

    // Plugins
    plugins: [
      new Webpack.ProgressPlugin(),
      new HTMLWebpackPlugin({ template: "./src/index.html" })
    ],

    // Developer Tool
    devtool: env.mode === "production" ? "source-map" : "cheap-eval-source-map",

    // Development Server Configuration
    devServer: {},

    // Optimization
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              unsafe: true,
              inline: true,
              passes: 2,
              keep_fargs: false
            },
            output: {
              beautify: false
            },
            mangle: true
          }
        }),

        new OptimizeCSSAssets({
          cssProcessorOptions: {
            preset: "advanced",
            safe: true,
            map: { inline: false }
          }
        })
      ]
    }
  };
};
