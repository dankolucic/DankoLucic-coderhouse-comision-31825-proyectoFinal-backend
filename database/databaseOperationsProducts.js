const fs = require("fs");


//persistence JSON
const persistenceFile = "./database/productsPersistenceFile.json";


//function
function getProductsFromFile(){
    let data;
    try{
        data = fs.readFileSync(persistenceFile, "utf-8");
    } catch (err){
        throw new Error(`Error de lectura: ${err.message}`);
    }
    const products = JSON.parse(data);
    return products;
}

//function
function addProductToFile(product){
    const products = getProductsFromFile();
    products.push(product);
    let productsString = JSON.stringify(products);
    try{
        fs.writeFileSync(persistenceFile, productsString ,"utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`);
    }
}

//function
function addProductsToFile(products){
    let productsString = JSON.stringify(products);
    try{
        fs.writeFileSync(persistenceFile, productsString ,"utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`);
    }
}

//function
function validateProductObject(product){
    if(!product.name && !product.description && !product.price && !product.image){
        throw new Error ("the object is not built correctly")
    }
}

//function
function idGenerate(){
    const products = getProductsFromFile();
    let array = [];
    for(i=0; i < products.length; i++){
        array[i] = Number(products[i].id)
    }
    array.sort((a,b)=>a-b)
    return (array[array.length-1]+1)
}


//operations
const databaseOperationsProducts = {

    getAllProducts: () => {
        return getProductsFromFile();
    },

    getProductAccordingId: id => {
        const products = getProductsFromFile();
        const searchedProduct = products.find( product => product.id == id);
        if(!searchedProduct){
            const error = new Error(`The product with id: "${id}" doesn't exist`);
            throw error; 
        }
        return searchedProduct
    },

    addProduct: data => {
        validateProductObject(data);
        const product = data;
        product.id = idGenerate();
        addProductToFile(product);
        return product;
    },

    replaceProductAccordingId: (id, data) => {
        const products = getProductsFromFile();
        const searchedIndex = products.findIndex( product => product.id == id);
        if(searchedIndex == -1){
            throw new Error("There is no product with the indicated ID");
        }
        else{
            const product = data;
            product.id = Number(id);
            validateProductObject(product)
            products[searchedIndex] = product;
            addProductsToFile(products);            
            return products;
        }
    
    },
    
    deleteProductAccordingId: id => {
        const products = getProductsFromFile();
        const searchedIndex = products.findIndex( product => product.id == id);
        if(searchedIndex == -1){
            throw new Error("There is no product with the indicated ID");
        }
        else{
            products.splice(searchedIndex,1);
            addProductsToFile(products);            
            return products;
        }
    },




}

module.exports = { databaseOperationsProducts }