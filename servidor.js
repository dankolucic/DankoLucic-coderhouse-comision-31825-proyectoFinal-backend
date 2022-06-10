//el servidor implementará dos conjuntos de rutas agrupadas en routers. Uno con la URL base /productos y el otro con /carrito. El puerto de esucha serà el 8080 para desarollo y process.env.PORT para producción en glitch.

//import node modules
const express = require("express");

//import functions
const { routerProducts } = require("./routes/routerProducts.js");
const { routerCart } = require("./routes/routerCart.js");

const app = express();

//middlewares (app.use)
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//routers
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

//server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`);
})