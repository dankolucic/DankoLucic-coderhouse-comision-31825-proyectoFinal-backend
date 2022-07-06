import config from '../../config.js';

export let productsDao;

switch(config.persistence) {
    case 'file' :
        try {
            const { default : FileProductsDao } = await import('./FileProductsDao.js');
            productsDao = new FileProductsDao(config.fileSystem.filesPath)
            break
        } catch (err) {
            console.log({error: err.message})
        }
        case 'mongodb_cloud':
        try {
            const { default : MongodbProductsDao } = await import('./MongodbProductsDao.js');
            productsDao = new MongodbProductsDao(config.mongodb_cloud.uri);
            break
        } catch (err) {
            console.log({error: err.message})
        }
        case 'mongodb_local':
            try {
                const { default : MongodbProductsDao } = await import('./MongodbProductsDao.js');
                productsDao = new MongodbProductsDao(config.mongodb_local.uri);
                break
            } catch (err) {
                console.log({error: err.message})
            }
    case 'firebase':
        try {
            const { default : FirebaseProductsDao } = await import('./FirebaseProductsDao.js');
            productsDao = new FirebaseProductsDao(config.firebase.key.nameFile)
            break   
        } catch (err) {
            console.log({error: err.message})
        }
}
