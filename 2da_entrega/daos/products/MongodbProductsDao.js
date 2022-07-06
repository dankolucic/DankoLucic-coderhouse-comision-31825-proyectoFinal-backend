import MongodbProductsContainer from "../../containers/products/MongodbProductsContainer.js"

export default class MongodbProductsDao extends MongodbProductsContainer {
    constructor(uri){
        super(uri)
    }
}