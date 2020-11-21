const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebplugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssertWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";
const prodMode = !devMode;
console.log(`IS DEV: `, devMode);

const filename = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoader = (extra) => {
  const loader = [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        // hmr: devMode,
        // reloadAll: true,
      },
    },
    "css-loader",
  ];

  if (extra) {
    loader.push(extra);
  }

  return loader;
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }

  if (prodMode) {
    config.minimizer = [
      new OptimizeCssAssertWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./index.js"],
    analytics: "./analytics.js",
  },
  output: {
    // filename: "[name].[contenthash].js",
    // filename: "[name].[hash].js",
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json", ".png"],
    alias: {
      "@models": path.resolve(__dirname, "src", "models"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4300,
    hot: devMode
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack",
      template: path.resolve(__dirname, "public", "index.html"),
      minify: {
        collapseWhitespace: prodMode
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebplugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "asserts/favicon.ico"),
        to: path.resolve(__dirname, "dist"),
      }, ],
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].[contenthash].css",
      // filename: "[name].[hash].js",
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
        use: cssLoader(),
      },
      {
        test: /\.less$/,
        use: cssLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoader("sass-loader"),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ],
  },
};
