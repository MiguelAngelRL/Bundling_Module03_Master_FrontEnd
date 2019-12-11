const merge = require("webpack-merge");
const base = require("./base.webpack.config.js");
const Dotenv = require('dotenv-webpack');

module.exports = merge (base, {
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: "[name].js"
    },
    module:{
        rules:[
            //LOADER CSS
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: [
                    {loader:"style-loader"}, //extrae los estilos del js y los escribe en el html del bundle
                    {loader:"css-loader"} //lee los css y los mete en el js de estilos del bundle
                ]
            },
            //LOADER SASS
            {
                test:/\.scss$/,
                exclude: /node_modules/,
                use: [
                    {loader:"style-loader"},
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
        new Dotenv({
          path: './dev.env',
        }),
    ]
});