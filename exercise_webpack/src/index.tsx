//Traza para saber en qué entorno hemos generado el bundle
console.log(`We are in ${process.env.NODE_ENV} mode!`);
//Traza para probar el dotenv
console.log(`URL base: ${process.env.URL_BASE}`);

const modulo:string = "Module 03";
const course:string = "Master FrontEnd VII";
const bundler:string = "WEBPACK";
//import logo from "./content/logo.png"; //para js
const logo:string = require("./content/logo.png"); //para ts

import React from "react";
import ReactDOM from "react-dom";

const img:HTMLImageElement = document.createElement("img");
img.src=logo;
document.getElementById("imgContainer").appendChild(img);

const salutation:string = `Welcome to the ${modulo} ${course} Assessment with ${bundler}`;
document.getElementById("salute").innerHTML=(salutation);

ReactDOM.render(
    <div>
        <p className="react-style">Hola mundo desde React</p>
    </div>,
    document.getElementById("root")
);
