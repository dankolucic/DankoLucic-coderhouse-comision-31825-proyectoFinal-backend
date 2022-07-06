import MongodbCartsContainer from "../../containers/cart/MongodbCartsContainer.js"

export default class MongodbCartssDao extends MongodbCartsContainer {
    constructor(uri){
        super(uri)
    }
}