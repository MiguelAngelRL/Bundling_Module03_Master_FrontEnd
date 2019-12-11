const merge = require("webpack-merge");
const base = require("./base.webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = merge (base, {
    mode: 'production',
    devtool: "source-map",
    output: {
        filename: "[name].[chunkhash].js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    enforce:true
                }
            },
        }
    },
    module:{
        rules:[
            //LOADER CSS
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, //crea los archivos css propiamente dichos y los referencia en el html
                    {loader:"css-loader"} //lee los css y los mete en el js de estilos del bundle
                ]
            },
            //LOADER SASS
            {
                test:/\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    {
                        loader:"sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin ({
            filename: "[name].[chunkhash].css", //nombre del fichero en el bundle
            chunkfilename: "[id].css" //el id que le pone el css-loader internamente en el js
        }),
        new Dotenv({
            path: './prod.env',
        })
    ]
});