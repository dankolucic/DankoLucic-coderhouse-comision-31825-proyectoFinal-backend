import { promises as fs } from 'fs';

export default class FileProductsContainer {

    constructor(persistenceFilePath){
        this.persistenceFilePath = persistenceFilePath;
    }

    async getAllProducts(){
        try{
            const data = await fs.readFile(this.persistenceFilePath, "utf-8");
            const products = JSON.parse(data);
            return products;
        } catch (err){
            throw new Error(`Error de lectura: ${err.message}`);
        }
    }

    async addProductToFile(product){
        const products = await this.getAllProducts();
        products.push(product);
        let productsString = JSON.stringify(products);
        try{
            await fs.writeFile(this.persistenceFilePath, productsString ,"utf-8");   
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    async addProductsToFile(products){
        let productsString = JSON.stringify(products);
        try{
            await fs.writeFile(this.persistenceFilePath, productsString ,"utf-8");   
        } catch (err){
            throw new Error(`Error de escritura: ${err.message}`);
        }
    }

    async validateProductObject(product){
        if(!product.name && !product.description && !product.price && !product.image){
            throw new Error ("the object is not built correctly")
        }
    }

    async idGenerate(){
        const products = await this.getAllProducts();
        let array = [];
        if(products.length >= 1){
            for(let index=0; index < products.length; index++){
            array[index] = Number(products[index].id)
            }
            array.sort((a,b)=>a-b)
            return (array[array.length-1]+1)
        }
        else{
            return 0;
        }
    }

    async getProductAccordingId(id){ 
        const products = await this.getAllProducts();
        const searchedProduct = products.find( product => product.id == id);
        if(!searchedProduct){
            const error = new Error(`The product with id: '${id}' doesn't exist`);
            throw error; 
        }
        return searchedProduct;
    }

    async addProduct(data){
        await this.validateProductObject(data);
        const product = data;
        product.id = await this.idGenerate();
        await this.addProductToFile(product);
        return product;
    }

    async replaceProductAccordingId (id, data){
        const products = await this.getAllProducts();
        const searchedIndex = products.findIndex( product => product.id == id);
        if(searchedIndex == -1){
            throw new Error("There is no product with the indicated ID");
        }
        else{
            const product = data;
            product.id = Number(id);
            this.validateProductObject(product);
            products[searchedIndex] = product;
            await this.addProductsToFile(products);            
            return products;
        }
    }
    
    async deleteProductAccordingId(id){
        const products = await this.getAllProducts();
        const searchedIndex = products.findIndex( product => product.id == id);
        if(searchedIndex == -1){
            throw new Error("There is no product with the indicated ID");
        }
        else{
            products.splice(searchedIndex,1);
            await this.addProductsToFile(products);            
            return products;
        }
    }
    
}
