import FileCartsContainer from "../../containers/cart/FileCartsContainer.js"

const nameFile = 'cartsPersistenceFile.json';

export default class FileCartsDao extends FileCartsContainer {
    constructor(filesPath){
        super(`${filesPath}/${nameFile}`)
    }
}