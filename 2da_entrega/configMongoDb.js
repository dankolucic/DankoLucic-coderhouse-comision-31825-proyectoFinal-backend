import { MongoClient } from 'mongodb';

const localHost = 'localhost';
const localPort = '27017';

const username = 'root';
const password = 'mongopassword';
const auth = 'admin';
const dirAtlas = 'cluster0.5hrf6.mongodb.net';

const uriMongoLocal = `mongodb://${username}:${password}@${localHost}:${localPort}/?authSource=${auth}`;
const uriMongoAtlas = `mongodb+srv://${username}:${password}@${dirAtlas}/?retryWrites=true&w=majority`;

const client = new MongoClient(uriMongoAtlas);

async function run(){
    try {

        await client.connect();

        const dbCoderhouse = client.db('coderhouse');
        const dbPersonas = dbCoderhouse.collection('personas');

        // const query = { nombre: 'Danko' };
        // const result = await dbPersonas.findOne(query);

        // await dbPersonas.insertOne({nombre:'Daniel', apellido: 'Luco'});

        const personas = await dbPersonas.find().toArray();
        
        console.log(personas);

    } catch (error) {
        return console.log(error);
    } finally {
        await client.close();
    }  
}

run();
