// Importer les modules nécessaires
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

// Configuration de Webpack

module.exports = {
  context: __dirname,
  mode: "production", // Définir le mode production pour la minification
  entry: {
    index: "./src/index.html", // Point d'entrée pour le fichier HTML
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // Dossier de destination pour les fichiers compilés
  //   filename: '[name].bundle.js', // Nom de fichier pour le bundle JavaScript
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/, // Sélectionner les fichiers HTML
        use: ["html-loader"], // Charger le HTML
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin(),

    new CssMinimizerPlugin({ include: /\/src\/assets/ }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  //   optimization: {
  //     minimize:true,
  //     minimizer: [
  //       new CssMinimizerPlugin({
  //         parallel: false,
  //         minimizerOptions: {
  //           processorOptions: {
  //             syntax: "postcss-scss",
  //             safe: true,
  //             discardComments: { removeAll: true },
  //             mergeLonghand: false,
  //             reduceTransforms: true,
  //             map: false,
  //             plugins: [
  //               "autoprefixer",
  //             ],
  //             parser: "sugarss",
  //           },
  //           preset: [
  //             "default",
  //             {
  //               discardComments: { removeAll: true },
  //             },
  //           ],
  //         },
  //       }),
  //     ],
  //   },
  optimization: {
    // [...]
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
  },
};
