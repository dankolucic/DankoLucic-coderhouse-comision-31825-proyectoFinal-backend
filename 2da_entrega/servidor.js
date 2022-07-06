//el servidor implementará dos conjuntos de rutas agrupadas en routers. Uno con la URL base /productos y el otro con /carrito. El puerto de esucha serà el 8080 para desarollo y process.env.PORT para producción en glitch.

//import node modules
// const express = require("express");
import express from "express";

//import functions
// const { routerProducts } = require("./routes/routerProducts.js");
// const { routerCart } = require("./routes/routerCart.js");
import { routerProducts } from "./routes/routerProducts.js"
import { routerCarts } from "./routes/routerCarts.js"

const app = express();

//middlewares (app.use)
app.use(express.json()) //para que express traiga archivos json
app.use(express.urlencoded({ extended:true }))

//routers
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`);
})