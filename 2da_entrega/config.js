const paramMongo = {
    local: {
        host: 'localhost',
        port: '27017',
        username: 'root',
        password: 'mongopassword',
        auth: 'admin',
    },
    cloud: {
        username: 'root',
        password: 'mongopassword',
        dirAtlas: 'cluster0.5hrf6.mongodb.net',
    }
}

const paramFirebase = {
    keyNameFile: 'proyecto01-55eb4-firebase-adminsdk-u8i9t-3b7e6c4fd4.json'
}

let config;

export default config = {
    persistence: 'firebase'
    ,
    fileSystem:{
        filesPath: './database'
    },
    mongodb_local: {
        uri:`mongodb://${paramMongo.local.username}:${paramMongo.local.password}@${paramMongo.local.host}:${paramMongo.local.port}/?authSource=${paramMongo.local.auth}`
    },
    mongodb_cloud: {
        uri:`mongodb+srv://${paramMongo.cloud.username}:${paramMongo.cloud.password}@${paramMongo.cloud.dirAtlas}/?retryWrites=true&w=majority`
    },
    firebase: {
        key: {
            nameFile: paramFirebase.keyNameFile
        }
    }
}
















