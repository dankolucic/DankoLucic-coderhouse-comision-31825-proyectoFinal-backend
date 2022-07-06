const { Router } = require("express");
const { controllersApiProducts } = require("../controllers/controllersApiProducts.js");


const routerProducts = new Router();

let isAdmin = true;

const isNotAdmin = {
    error : "usted no tiene autorización"
}

function onlyAdmin(req, res, next){
    if(isAdmin){
        next();
    } else {
        res.status(404).json(isNotAdmin);
    }
}

//GET: '/' - Me permite listar todos los productos disponibles (disponible para todes)
routerProducts.get("/", controllersApiProducts.getProducts);

//GET: '/:id' - Me permite listar un producto por su id (disponible para todes)
routerProducts.get("/:idProduct", controllersApiProducts.getProduct);

//POST: '/' - Para incorporar productos al listado (disponible solo para administradores)
routerProducts.post("/", onlyAdmin, controllersApiProducts.postProduct);

//PUT: '/:id' - Actualiza un producto por su id (disponible solo para administradores)
routerProducts.put("/:idProduct", onlyAdmin, controllersApiProducts.putProduct);

//DELETE: '/:id' - Borra un producto por su id (disponible solo para administradores)
routerProducts.delete("/:idProduct", onlyAdmin, controllersApiProducts.deleteProduct);


module.exports = { routerProducts };