// const { databaseOperationsProducts } = require("../database/databaseOperationsProducts.js");
// import { databaseOperationsProducts } from "../database/databaseOperationsProducts.js"
import { productsDao } from "../daos/products/index.js";


export const controllersApiProducts = {

    getProducts: async (req,res) =>  {
        try {
            const allProducts = await productsDao.getAllProducts();
            res.json(allProducts);
        } catch (err) {
            res.status(404).json({ error: err.message })  
        }
    },

    getProduct: async (req,res) => {
        try{
            const id = req.params.idProduct;
            const selectProduct = await productsDao.getProductAccordingId(id);
            res.json(selectProduct);
        }
        catch (err){
            // Un Error 404 es el código HTTP que envía el servidor al usuario cuando la URL a la que está intentando acceder no existe.
            res.status(404).json({ error: err.message })            
        }
    }, 

    postProduct: async (req,res) =>  {
        try {
            const addedProduct = await productsDao.addProduct(req.body);
            // Un código de estado 201 Creado es como un código de estado 200 OK, sin embargo, un código de estado 201 significa que una solicitud se procesó correctamente y devolvió,o creó, un recurso o resources en el proceso.
            res.status(201).json(addedProduct);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
        
    },

    putProduct: async (req,res) =>  {
        try{
            const id = req.params.idProduct;
            const data = req.body
            const updateProducts = await productsDao.replaceProductAccordingId(id,data);
            res.status(200).json(updateProducts);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    deleteProduct: async (req,res) =>  {
        try{
            const id = req.params.idProduct;
            const updateProducts = await productsDao.deleteProductAccordingId(id);
            res.status(200).json(updateProducts);
        }
        catch(err){
            res.status(404).json({ error: err.message })
        }
    },

  
}

