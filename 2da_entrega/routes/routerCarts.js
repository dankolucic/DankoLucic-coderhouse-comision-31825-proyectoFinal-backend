// const { Router } = require("express");
// const { controllersApiCart } = require("../controllers/controllersApiCart.js");

import Router from "express"
import { controllersApiCarts } from "../controllers/controllersApiCarts.js"


export const routerCarts = new Router();

//disponibles para usuarios y para administradores

//POST: '/' - Crea un carrito y devuelve su id.
routerCarts.post("/", controllersApiCarts.postCart);

//POST: '/:id_carrito/productos' - Para incorporar productos al carrito, enviando el id de producto en el cuerpo de la petición.
routerCarts.post("/:idCart/products", controllersApiCarts.postProductToCart);

//GET: '/:id_carrito/productos' - Me permite listar todos los productos guardados en el carrito
routerCarts.get("/:idCart/products", controllersApiCarts.getProductsCart);

//DELETE: '/:id_carrito/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto.
routerCarts.delete("/:idCart/products/:idProduct", controllersApiCarts.deleteProductFromCart);

//DELETE: '/:id_carrito' - Vacía un carrito. (para mi, es eliminar carrito por el método DELETE)
routerCarts.delete("/:idCart", controllersApiCarts.deleteCart);

