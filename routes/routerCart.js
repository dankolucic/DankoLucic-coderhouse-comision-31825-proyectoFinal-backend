const { Router } = require("express");
const { controllersApiCart } = require("../controllers/controllersApiCart.js");


const routerCart = new Router();

//disponibles para usuarios y para administradores

//POST: '/' - Crea un carrito y devuelve su id.
// routerCart.post("/", controllersApiCart.postCart);

//POST: '/:id_carrito/productos' - Para incorporar productos al carrito, enviando el id de producto en el cuerpo de la petición.
// routerCart.post("/:idCart/product", controllersApiCart.postProductCart);

//GET: '/:id_carrito/productos' - Me permite listar todos los productos guardados en el carrito
// routerCart.get("/:idCart/products", controllersApiCart.getProductsCart);

//DELETE: '/:id_carrito/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.
// routerCart.delete("/:idCart/products/:idProduct", controllersApiCart.deleteProduct);

//DELETE: '/:id_carrito' - Vacía un carrito.
// routerCart.delete("/:idCart", controllersApiCart.deleteCart);


module.exports = { routerCart };