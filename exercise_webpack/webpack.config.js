const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"), //Para evitarnos poner ./src en los nombres de ficheros
    devtool: "source-map", // Porque en la configuracion de TS hemos activado los Map
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
        app: ["./index.tsx"],
        appStyles: ["./styles.scss"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    enforce:true
                },
            },
        }
    },
    output: {
        filename: "[name].[chunkhash].js"
    },
    module:{
        rules:[
            //LOADER BABEL
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                loader: "babel-loader"
            },
            //LOADER CSS
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: [
                    //{loader:"style-loader"}, //extrae los estilos del js y los escribe en el html del bundle
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
        }),
        new MiniCssExtractPlugin ({
            filename: "[name].[chunkhash].css", //nombre del fichero en el bundle
            chunkfilename: "[id].css" //el id que le pone el css-loader internamente en el js
        })
    ]
}