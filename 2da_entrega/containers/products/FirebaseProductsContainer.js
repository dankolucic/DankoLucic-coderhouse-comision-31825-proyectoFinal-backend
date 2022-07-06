import admin from 'firebase-admin'
import fs from 'fs'



const param = {
    // database: 'coderhouse',
    collection: 'products'
}


export default class FirebaseProductsContainer {
    constructor(uri){
        this.uri = `./database/firebase/key/${uri}`;
    }

     asObj (doc){
        return { id: doc.id, ...doc.data() }
     }

     _asObj (doc){
        return { _id: doc.id, ...doc.data() }
     }

     async getAllProducts(){
        try{
            const serviceAccount = JSON.parse(fs.readFileSync(this.uri))

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })

            const database = admin.firestore();
            const collection = database.collection(`${param.collection}`)

            const products = []
            const snapshot = await collection.get();
            snapshot.forEach( doc => {
                products.push(this.asObj(doc))
            })

            return products;
        } catch (err){
            throw new Error(`Eror in 'getAllProducts()': ${err.message}`);
        } finally {
            await admin.app().delete();
        }
        
    }

    async _getAllProducts(){
        try{
            const serviceAccount = JSON.parse(fs.readFileSync(this.uri))

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })

            const database = admin.firestore();
            const collection = database.collection(`${param.collection}`)

            const products = []
            const snapshot = await collection.get();
            snapshot.forEach( doc => {
                products.push(this._asObj(doc))
            })

            return products;
        } catch (err){
            throw new Error(`Eror in 'getAllProducts()': ${err.message}`);
        } finally {
            await admin.app().delete();
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
            const serviceAccount = JSON.parse(fs.readFileSync(this.uri))

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })

            const database = admin.firestore();
            const collection = database.collection(`${param.collection}`)

            await collection.add(product)

        } catch (err){
            throw new Error(`Eror in 'addProductToFile(product)': ${err.message}`);
        } finally {
            await admin.app().delete();
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
            const products = await this._getAllProducts();
            const searchedIndex = products.findIndex( product => product.id == id);
            if(searchedIndex == -1){
                throw new Error("There is no product with the indicated ID");
            }
            else{
                const product = data;
                product.id = Number(id);
                this.validateProductObject(product);
            
                // products[searchedIndex] = product;

                const serviceAccount = JSON.parse(fs.readFileSync(this.uri))

                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount)
                })
    
                const database = admin.firestore();
                const collection = database.collection(`${param.collection}`);

                await collection.doc(products[searchedIndex]._id).update(product);

    
                // const _products = await this.getAllProducts();

                // return _products;
            }
            
        } catch (err){
            throw new Error(`Eror in 'replaceProductAccordingId (id, data)': ${err.message}`);
        } finally {
            await admin.app().delete();
        }
        try {
            const _products = await this.getAllProducts();
            return _products;
        } catch (err) {
            throw new Error(`Eror in 'replaceProductAccordingId (id, data)': ${err.message}`);
        }
    }

    async deleteProductAccordingId(id){
    try {
        const products = await this._getAllProducts();
        const searchedIndex = products.findIndex( product => product.id == id);
        if(searchedIndex == -1){
            throw new Error("There is no product with the indicated ID");
        }
        else{

            const serviceAccount = JSON.parse(fs.readFileSync(this.uri))

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })

            const database = admin.firestore();
            const collection = database.collection(`${param.collection}`);

            await collection.doc(products[searchedIndex]._id).delete();

        } 
    } catch (err){
        throw new Error(`Eror in 'deleteProductAccordingId(id)': ${err.message}`);
    } finally {
        await admin.app().delete();
    }
    try {
        const _products = await this.getAllProducts();
        return _products;
    } catch (err) {
        throw new Error(`Eror in 'deleteProductAccordingId(id)': ${err.message}`);
    }

}
    
}

