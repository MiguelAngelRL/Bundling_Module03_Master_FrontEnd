const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"), //Para evitarnos poner ./src en los nombres de ficheros
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
        app: ["./index.tsx"],
        appStyles: ["./styles.scss"]
    },
    module:{
        rules:[
            //LOADER BABEL
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader: "babel-loader"
            },
            //LOADER IMAGENES
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                    esModule: false //Si no, la imagen no se mostraba con el require de Typescript
                }                   //stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module
            },
            //LOADER AWESOME TS
            {
                test:/\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    useBabel: true,
                    babelCore: "@babel/core"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filename:"index.html", //nombre del fichero en el bundle
            template: "./index.html", //fichero origen
        })
    ]
}