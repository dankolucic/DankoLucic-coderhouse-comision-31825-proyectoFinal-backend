import { promises as fs } from 'fs';
import { productsDao } from '../../daos/products/index.js';

export default class FileCartsContainer {

    constructor(persistenceFilePath){
        this.persistenceFilePath = persistenceFilePath;
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
            throw new Error(`Error de lectura: ${err.message}`);
        }

    }

    async getCartsFromFile(){
        try{
            const data = await fs.readFile(this.persistenceFilePath, "utf-8");
            const carts = JSON.parse(data);
            return carts;
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
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
            throw new Error(`Error de lectura: ${err.message}`);
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
            throw new Error(`Error de lectura: ${err.message}`);
        } 
    }

    async writeCartsToFile(carts){
        const cartsString = JSON.stringify(carts);
        try{
            await fs.writeFile(this.persistenceFilePath, cartsString ,"utf-8");   
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    async createAndPushCart(idCart){
        try {
            const carts = await this.getCartsFromFile();
            const newCart =  {
                "id":idCart,
                "idProduct": []
            };
            await carts.push(newCart);
            return carts;
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
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

    async pushProductToCart(indexCart,indexProduct){
        try {
            const carts = await this.getCartsFromFile();
            const products = await productsDao.getAllProducts();
            (carts[indexCart].products).push(products[indexProduct]);
            return carts;
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    //operations
     async createCart(){
        try {
            const idCart = await this.idGenerate();
            const carts = await this.createAndPushCart(idCart);
            await this.writeCartsToFile(carts)
            return idCart;
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
            const carts = await this.pushProductToCart(indexCart,indexProduct);
            console.log(carts);
            await this.writeCartsToFile(carts);
            return carts;
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    async getProductosInCart(idCart) {
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

    async deleteProductFromCart(idCart,idProduct){
        try {
            await this.validateExistCart(idCart);
            await this.validateExistProduct(idProduct);
            const indexCart = await this.findIndexCart(idCart);
            const indexProductInsideCart = await this.findIndexProductInsideCart(indexCart,idProduct);
            const carts = await this.getCartsFromFile();
            (carts[indexCart].products).splice(indexProductInsideCart,1);
            await this.writeCartsToFile(carts);
            return carts[indexCart].products
        } catch (err){
            throw new Error(`Error: ${err.message}`);
        }
    }

    async deleteCart(idCart){
        try {
            await this.validateExistCart(idCart);
            const indexCart = await this.findIndexCart(idCart);
            const carts = await this.getCartsFromFile();
            carts.splice(indexCart,1);
            await this.writeCartsToFile(carts);
        } catch (err){
            throw new Error(`Error: ${err.message}`);
        }
    }


}

