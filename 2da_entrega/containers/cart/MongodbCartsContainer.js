import { MongoClient } from 'mongodb';
import { productsDao } from '../../daos/products/index.js';

const param = {
    database: 'coderhouse',
    collection: 'carts',
}

let client;

export default class MongodbCartsContainer{
    constructor(uri){
        this.uri = uri;
    }

    async createAndPushCart(idCart){
        try {
            const newCart =  {
                id :idCart,
                products: []
            };
            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            await collection.insertOne(newCart)

            const carts = await collection.find().toArray();
            return carts;
        } catch (err){
            throw new Error(`Error in 'createAndPushCart(idCart)': ${err.message}`);
        } finally {
            await client.close();
        }
    }

    async getCartsFromFile(){
        try{
            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            const carts = await collection.find().toArray();
            return carts;
        } catch (err){
            throw new Error(`Error in 'getCartsFromFile()': ${err.message}`);
        } finally {
            await client.close();
        }
    }

    async idGenerate(){
        try {
            const carts = await this.getCartsFromFile();
            let array = [];
            if(carts.length >= 1){
                for(let index=0; index < carts.length; index++){
                    array[index] = Number(carts[index].id)
                }
                array.sort((a,b)=>a-b)
                return (array[array.length-1]+1)
            }
            else{
                return 0;
            }
        } catch (err){
            throw new Error(`Error in 'idGenerate()': ${err.message}`);
        }
    }
    
    async createCart(){
        try {
            const idCart = await this.idGenerate();
            const carts = await this.createAndPushCart(idCart);
            return idCart;
        } catch (err){
            throw new Error(`Error in 'createCart()': ${err.message}`);
        }
    }

    async validateExistProduct(idProduct){
        try {
            const products = await productsDao.getAllProducts();
            const searchedProduct = products.find( product => product.id == idProduct);
            if(!searchedProduct){
                const error = new Error(`The product with id: '${idProduct}' doesn't exist`);
                throw error; 
            }
            return searchedProduct;
        } catch (err){
            throw new Error(`Error in validateExistProduct(idProduct): ${err.message}`);
        }
    
    }

    async validateExistCart(idCart){
        try {
            const carts = await this.getCartsFromFile();
            const searchedCart = carts.find( cart => cart.id == idCart);
            if(!searchedCart){
                const error = new Error(`The cart with id: '${idCart}' doesn't exist`);
                throw error; 
            }
            return searchedCart; 
        } catch (err){
            throw new Error(`Error in validateExistCart(idCart): ${err.message}`);
        } 
    }

    async findIndexCart(idCart){
        try {
            const carts = await this.getCartsFromFile();
            const searchedIndex = carts.findIndex( cart => cart.id == idCart);
            if(searchedIndex == -1){
                throw new Error("There is no cart with the indicated ID");
            }
            else{
                return searchedIndex;
           } 
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
        }
    }

    async findIndexProduct(idProduct){
        try {
            const products = await productsDao.getAllProducts();
            const searchedIndex = products.findIndex( product => product.id == idProduct);
            if(searchedIndex == -1){
                throw new Error("There is no product with the indicated ID");
            }
            else{
                return searchedIndex;
            }
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
        }
    
    }

    async pushProductToCart(indexCart,indexProduct){
        try {
            const carts = await this.getCartsFromFile();
            const products = await productsDao.getAllProducts();
            (carts[indexCart].products).push(products[indexProduct]);
            return carts[indexCart];
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    async postProductToCart(idCart, data){
        try {
            await this.validateExistCart(idCart);
            const idProduct = (data.id);
            await this.validateExistProduct(idProduct);
            const indexCart = await this.findIndexCart(idCart);
            const indexProduct = await this.findIndexProduct(idProduct);
            const cart = await this.pushProductToCart(indexCart,indexProduct);

            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            await collection.findOneAndReplace({id: cart.id }, cart )

            const findCart = await collection.findOne({id: cart.id })
            return findCart;
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        } finally {
            await client.close();
        }
    }

    async getProductsInCart(idCart) {
        try {
            await this.validateExistCart(idCart);
            const indexCart = await this.findIndexCart(idCart);
            const carts = await this.getCartsFromFile();
            const productsInCart = carts[indexCart].products;
            return productsInCart;
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
        }
    }

    async findIndexProductInsideCart(indexCart,idProduct){
        try {
            const carts = await this.getCartsFromFile();
            const searchedIndex = (carts[indexCart].products).findIndex( product => product.id == idProduct);
            if(searchedIndex == -1){
                throw new Error("There is no product with the indicated ID");
            }
            else{
                return searchedIndex;
            }
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
        }
    
    }

    async deleteProductFromCart(idCart,idProduct){
        try {
            await this.validateExistCart(idCart);
            await this.validateExistProduct(idProduct);
            const indexCart = await this.findIndexCart(idCart);
            const indexProductInsideCart = await this.findIndexProductInsideCart(indexCart,idProduct);
            const carts = await this.getCartsFromFile();
            (carts[indexCart].products).splice(indexProductInsideCart,1);

            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            await collection.findOneAndReplace({id: carts[indexCart].id }, carts[indexCart] )

            const findCart = await collection.findOne({id: carts[indexCart].id })

            return findCart.products

        } catch (err){
            throw new Error(`Error: ${err.message}`);
        } finally {
            await client.close();
        }
    }

    async deleteCart(idCart){
        try {
            await this.validateExistCart(idCart);

            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            await collection.deleteOne({ id: Number(idCart) })

        } catch (err){
            throw new Error(`Error: ${err.message}`);
        } finally {
            await client.close();
        }
    }


}












