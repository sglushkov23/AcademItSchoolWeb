const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    devtool: "source-map",

    target: ["web", "es5"],

    entry: "./js/phone_book.js",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "../public")
    },

    resolve: {
        alias: {
            //"vue$": "vue/dist/vue.esm.js"
            "vue$": "vue/dist/vue.runtime.esm.js"
        }
    },

    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }, {
            test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
            use: "file-loader?name=[path][name].[ext]?[contenthash]"
        }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "style.css"}),
        new VueLoaderPlugin()
    ]
};