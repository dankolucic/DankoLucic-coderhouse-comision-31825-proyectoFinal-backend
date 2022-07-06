const { databaseOperationsProducts } = require("../database/databaseOperationsProducts.js");

const controllersApiProducts = {

    getProducts: (req,res) => {
        const allProducts = databaseOperationsProducts.getAllProducts();
        res.json(allProducts);
    },

    getProduct: (req,res) => {
        const id = req.params.idProduct;
        //promesa
        try{
            const selectProduct = databaseOperationsProducts.getProductAccordingId(id);
            res.json(selectProduct);
        }
        catch (err){
            // Un Error 404 es el código HTTP que envía el servidor al usuario cuando la URL a la que está intentando acceder no existe.
            res.status(404).json({ error: err.message })            
        }
    }, 

    postProduct: (req,res) =>  {
        const addedProduct = databaseOperationsProducts.addProduct(req.body);
        // Un código de estado 201 Creado es como un código de estado 200 OK, sin embargo, un código de estado 201 significa que una solicitud se procesó correctamente y devolvió,o creó, un recurso o resources en el proceso.
        res.status(201).json(addedProduct);
    },

    putProduct: (req,res) =>  {
        const id = req.params.idProduct;
        const data = req.body
        try{ 
            const updateProducts = databaseOperationsProducts.replaceProductAccordingId(id,data);
            res.status(200).json(allReplaceProducts);
        }
        catch(err){
            res.status(404).json({ error: err.message });
        }
    },

    deleteProduct: (req,res) =>  {
        const id = req.params.idProduct;
        try{
            const updateProducts = databaseOperationsProducts.deleteProductAccordingId(id);
            res.status(200).json(updateProducts);
        }
        catch(err){
            res.status(404).json({ error: err.message })
        }
    },


    
    // getProductosRaiz: (req,res) => {
    //     res.render("formulario");

    // },

 

    // deleteProducto: (req,res) =>  {
    //     const id = req.params.idProducto;
    //     try{
    //         databaseProductos.borrarProductoSegunId(id);
    //        res.sendStatus(204);
    //     }
    //     catch(err){
    //         if(err.tipo == "db not found"){
    //             res.status(404).json({ error: err.message })
    //         }
    //         else{
    //             res.status(500).json({ error: err.message })
    //         }
    //     }
    // },
  
}

module.exports = { controllersApiProducts }