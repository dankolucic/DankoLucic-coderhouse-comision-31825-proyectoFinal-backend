import FileProductsContainer from "../../containers/products/FileProductsContainer.js"

const nameFile = 'productsPersistenceFile.json'

export default class FileProductsDao extends FileProductsContainer {
    constructor(filesPath){
        super(`${filesPath}/${nameFile}`)
    }
}

