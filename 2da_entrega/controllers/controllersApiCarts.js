// const { databaseOperationsCart } = require("../database/databaseOperationsCart.js");
// import { databaseOperationsCart } from "../database/databaseOperationsCart.js"
import { cartsDao } from "../daos/cart/index.js";

export const controllersApiCarts = {


    postCart: async (req,res) =>  {
        try{ 
            const idCreatedCart = await cartsDao.createCart();
            // Un código de estado 201 Creado es como un código de estado 200 OK, sin embargo, un código de estado 201 significa que una solicitud se procesó correctamente y devolvió,o creó, un recurso o resources en el proceso.
            res.status(201).json(idCreatedCart);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    
    postProductToCart: async (req,res) =>  {
        try{
            const idCart = req.params.idCart;
            const data = req.body;
            const cartCreated = await cartsDao.postProductToCart(idCart,data);
            res.status(200).json(cartCreated);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    getProductsCart: async (req,res) => {
        try{ 
            const idCart = req.params.idCart;
            const productsInCart = await cartsDao.getProductsInCart(idCart);
            res.status(200).json(productsInCart);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },

    deleteProductFromCart: async (req,res) => {
        try{ 
            const idCart = req.params.idCart;
            const idProduct = req.params.idProduct;
            await cartsDao.deleteProductFromCart(idCart,idProduct);
            res.status(200).json({ message: `product '${idProduct}' successfully deleted form cart '${idCart}'`});
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },

    deleteCart: async (req,res) => {
        try{ 
            const idCart = req.params.idCart;
            await cartsDao.deleteCart(idCart);
            res.status(200).json({ message: `cart '${idCart}' successfully deleted`})
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },


}
