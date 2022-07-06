import { MongoClient } from 'mongodb';

const param = {
    database: 'coderhouse',
    collection: 'products',
}

let client;



export default class MongodbProductsContainer {
    constructor(uri){
        this.uri = uri;
    }

    async getAllProducts(){
        try{
            client = new MongoClient(this.uri);
            await client.connect();
           
            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            const products = await collection.find().toArray();
            return products;
            
        } catch (err){
            throw new Error(`Eror in 'getAllProducts()': ${err.message}`);
        } finally {
            await client.close();
        }
        

    }

    async getProductAccordingId(id){ 
        try {
            const products = await this.getAllProducts();
            const searchedProduct = products.find( product => product.id == id);
            if(!searchedProduct){
                const error = new Error(`The product with id: '${id}' doesn't exist`);
                throw error; 
            }
            return searchedProduct;
        } catch (err){
            throw new Error(`Eror in 'getProductAccordingId(id)': ${err.message}`);
        }
    }

    validateProductObject(product){
        if(!product.name && !product.description && !product.price && !product.image){
            throw new Error ("the object is not built correctly")
        }
    }

    async idGenerate(){
        try {
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
        } catch (err){
            throw new Error(`Eror in 'idGenerate()': ${err.message}`);
        }

    }

    async addProductToFile(product){

        try {
            client = new MongoClient(this.uri);
            await client.connect();

            const database = client.db(param.database);
            const collection = database.collection(param.collection);

            await collection.insertOne(product);
        } catch (err){
            throw new Error(`Eror in 'addProductToFile(product)': ${err.message}`);
        } finally {
            await client.close();
        }
    }

    async addProduct(data){
        try {
            this.validateProductObject(data);
            const product = data;
            product.id = await this.idGenerate();
            await this.addProductToFile(product);
            return product;
        } catch (err){
            throw new Error(`Eror in 'addProduct(data)': ${err.message}`);
        }

    }

    
    async replaceProductAccordingId (id, data){
        try {
            const products = await this.getAllProducts();
            const searchedIndex = products.findIndex( product => product.id == id);
            if(searchedIndex == -1){
                throw new Error("There is no product with the indicated ID");
            }
            else{
                const product = data;
                product.id = Number(id);
                this.validateProductObject(product);
            
                // products[searchedIndex] = product;

                client = new MongoClient(this.uri);
                await client.connect();
    
                const database = client.db(param.database);
                const collection = database.collection(param.collection);
                
                const producto = await collection.findOneAndReplace({ id: Number(id) }, product )
                
                const products = await collection.find().toArray();
           
                return products;
            }
            
        } catch (err){
            throw new Error(`Eror in 'replaceProductAccordingId (id, data)': ${err.message}`);
        } finally {
            await client.close();
        }
    }
 
    

    async deleteProductAccordingId(id){
        try {
            const products = await this.getAllProducts();
            const searchedIndex = products.findIndex( product => product.id == id);
            if(searchedIndex == -1){
                throw new Error("There is no product with the indicated ID");
            }
            else{
    
                client = new MongoClient(this.uri);
                await client.connect();
    
                const database = client.db(param.database);
                const collection = database.collection(param.collection);
                
                await collection.deleteOne({ id: Number(id) })
    
                const products = await collection.find().toArray();
                return products;
            } 
        } catch (err){
            throw new Error(`Eror in 'deleteProductAccordingId(id)': ${err.message}`);
        } finally {
            await client.close();
        }

    }

}


