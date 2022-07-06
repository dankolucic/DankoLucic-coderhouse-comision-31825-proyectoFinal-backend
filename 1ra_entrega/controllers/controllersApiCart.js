const { databaseOperationsCart } = require("../database/databaseOperationsCart.js");

const controllersApiCart = {


    postCart: (req,res) =>  {
        try{ 
            const idCreatedCart = databaseOperationsCart.createCart();
            // Un código de estado 201 Creado es como un código de estado 200 OK, sin embargo, un código de estado 201 significa que una solicitud se procesó correctamente y devolvió,o creó, un recurso o resources en el proceso.
            res.status(201).json(idCreatedCart);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    
    postProductToCart: (req,res) =>  {
        const idCart = req.params.idCart;
        const data = req.body;
        try{ 
            const cartCreated = databaseOperationsCart.postProductToCart(idCart,data);
            res.status(200).json(cartCreated);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    getProductsCart: (req,res) => {
        const idCart = req.params.idCart;
        try{ 
            const productsInCart = databaseOperationsCart.getProductosInCart(idCart);
            res.status(200).json(productsInCart);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },

    deleteProductFromCart: (req,res) => {
        const idCart = req.params.idCart;
        const idProduct = req.params.idProduct;

        try{ 
            const newCart = databaseOperationsCart.deleteProductFromCart(idCart,idProduct);
            res.status(200).json(newCart);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },

    deleteCart: (req,res) => {
        const idCart = req.params.idCart;
        try{ 
            databaseOperationsCart.deleteCart(idCart);
            res.status(200).json({ message: "cart successfully deleted"})
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
        
    },



}

module.exports = { controllersApiCart }