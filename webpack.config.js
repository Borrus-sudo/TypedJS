"use strict";

const path = require("path");
const config = {
    entry: "./src/index.js", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, "out"),
        filename: "bundle.js",
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-proposal-export-namespace-from"],
                },
            },
        }, ],
    },
};
module.exports = config;