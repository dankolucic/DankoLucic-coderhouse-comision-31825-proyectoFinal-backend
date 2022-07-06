import config from '../../config.js';

export let cartsDao;

switch(config.persistence){
    case 'file':
        try {
            const { default : FileCartsDao } = await import('./FileCartsDao.js');
            cartsDao = new FileCartsDao(config.fileSystem.filesPath)
            break
        } catch (err) {
            console.log({error: err.message})
        }
    case 'mongodb_cloud':
        try {
            const { default : MongodbCartsDao } = await import('./MongodbCartsDao.js');
            cartsDao = new MongodbCartsDao(config.mongodb_cloud.uri);
            break 
        } catch (err) {
            console.log({error: err.message})
        }
    case 'mongodb_local':
        try {
            const { default : MongodbCartsDao } = await import('./MongodbCartsDao.js');
            cartsDao = new MongodbCartsDao(config.mongodb_local.uri);
            break 
        } catch (err) {
            console.log({error: err.message})
        }
    case 'firebase':
        try {
            const { default : FirebaseCartsDao } = await import('./FirebaseCartsDao.js');
            cartsDao = new FirebaseCartsDao(config.firebase.key.nameFile);
            break
        } catch (err) {
            console.log({error: err.message})
        }

}