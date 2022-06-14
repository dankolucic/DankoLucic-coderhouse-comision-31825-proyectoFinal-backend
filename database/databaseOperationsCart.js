const fs = require("fs");


//persistence JSON
const persistenceFile = "./database/cartPersistenceFile.json";


const { getProductsFromFile } = require("./databaseOperationsProducts");


//function
function validateExistProduct(idProduct){
    const products = getProductsFromFile();
    const searchedProduct = products.find( product => product.id == idProduct);
    if(!searchedProduct){
        const error = new Error(`The product with id: "${idProduct}" doesn't exist`);
        throw error; 
    }
    return searchedProduct;
}


function getCartsFromFile(){
    let data;
    try{
        data = fs.readFileSync(persistenceFile, "utf-8");
    } catch (err){
        throw new Error(`Error de lectura: ${err.message}`);
    }
    const carts = JSON.parse(data);
    return carts;
}

//function
function idGenerate(){
    const carts = getCartsFromFile();
    let array = [];
    if(carts.length >= 1){
        for(i=0; i < carts.length; i++){
            array[i] = Number(carts[i].id)
        }
        array.sort((a,b)=>a-b)
        return (array[array.length-1]+1)
    }
    else{
        return 0;
    }
}

//function
function validateExistCart(idCart){
    const carts = getCartsFromFile();
    const searchedCart = carts.find( cart => cart.id == idCart);
    if(!searchedCart){
        const error = new Error(`The cart with id: "${idCart}" doesn't exist`);
        throw error; 
    }
    return searchedCart;
}


//function
function writeCartsToFile(carts){
    let cartsString = JSON.stringify(carts);
    try{
        fs.writeFileSync(persistenceFile, cartsString ,"utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`);
    }
}

//function
function createAndPushCart(idCart){
    const carts = getCartsFromFile();
    const newCart = {
        "id":idCart,
        "idProduct": []
    };
    carts.push(newCart);
    return carts;
}

function findIndexCart(idCart){
    const carts = getCartsFromFile();
    const searchedIndex = carts.findIndex( cart => cart.id == idCart);
    if(searchedIndex == -1){
        throw new Error("There is no cart with the indicated ID");
    }
    else{
        return searchedIndex;
    }
}

function findIndexProduct(idProduct){
    const products = getProductsFromFile();
    const searchedIndex = products.findIndex( product => product.id == idProduct);
    if(searchedIndex == -1){
        throw new Error("There is no product with the indicated ID");
    }
    else{
        return searchedIndex;
    }
}

function findIndexProductInsideCart(indexCart,idProduct){
    const carts = getCartsFromFile();
    const searchedIndex = (carts[indexCart].products).findIndex( product => product.id == idProduct);
    if(searchedIndex == -1){
        throw new Error("There is no product with the indicated ID");
    }
    else{
        return searchedIndex;
    }
}

function pushProductToCart(indexCart,indexProduct){
    const carts = getCartsFromFile();
    const products = getProductsFromFile();
    (carts[indexCart].products).push(products[indexProduct]);
    return carts
    
}


//operations
const databaseOperationsCart = {

    createCart: () => {
        idCart = idGenerate();
        const carts = createAndPushCart(idCart);
        writeCartsToFile(carts)
        return idCart;
    },

    postProductToCart: (idCart, data) => {
        validateExistCart(idCart);
        const idProduct = (data.id);
        validateExistProduct(idProduct);
        const indexCart = findIndexCart(idCart);
        const indexProduct = findIndexProduct(idProduct);
        const carts = pushProductToCart(indexCart,indexProduct);
        writeCartsToFile(carts);
        return carts;
    },

    getProductosInCart: (idCart) => {
        validateExistCart(idCart);
        const indexCart = findIndexCart(idCart);
        const carts = getCartsFromFile();
        const productsInCart = carts[indexCart].products;
        return productsInCart;

    },

    deleteProductFromCart: (idCart,idProduct) => {
        validateExistCart(idCart);
        validateExistProduct(idProduct);
        const indexCart = findIndexCart(idCart);
        const indexProductInsideCart = findIndexProductInsideCart(indexCart,idProduct);
        const carts = getCartsFromFile();
        (carts[indexCart].products).splice(indexProductInsideCart,1);
        writeCartsToFile(carts);
        return carts[indexCart].products

    },

    deleteCart: (idCart) => {
        validateExistCart(idCart);
        const indexCart = findIndexCart(idCart);
        const carts = getCartsFromFile();
        carts.splice(indexCart,1);
        writeCartsToFile(carts);
    }

}

module.exports = { databaseOperationsCart };
