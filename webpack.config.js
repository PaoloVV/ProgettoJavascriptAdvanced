const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
    entry: `./src/JS/index.js`,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `bundle.js`,
        clean: true
    },
    module: {
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader", "css-loader"]
            },
            {
                type: "asset/resource",
                test: /\.(jpg|jpeg|png)/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:`Applicazione webpack`,
            template:`./src/index.html`
        }),
        new FaviconsWebpackPlugin("./src/IMG/hacker-favicon.png")
    ],
    devServer: {
        open: true,
        static: path.resolve(__dirname, `dist`)
    },
    mode: `production`
}