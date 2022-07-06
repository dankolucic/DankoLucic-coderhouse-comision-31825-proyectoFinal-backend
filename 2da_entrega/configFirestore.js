//firebase config
import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./database/firebase/key/proyecto01-55eb4-firebase-adminsdk-u8i9t-3b7e6c4fd4.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


function asObj (doc){
   return { _id: doc.id, ...doc.data() }
}

console.log('Base Firebase conectada')

const db = admin.firestore();
const dbPersonas = db.collection("products")


const result = []
const snapshot = await dbPersonas.get();
snapshot.forEach( doc => {
    result.push(asObj(doc))
})
console.log(result)


// const guardado = await dbPersonas.add({nombre: "pepe", apellido: "popo", edad:30})
// console.log(guardado.id)

//reemplaza todos los registros clave/valor por el objeto dentro del set()
// await dbPersonas.doc('8ZJo8jiPfdX9AWBBdWoz').set({nombre: "otroNombre"});
// await dbPersonas.doc('8ZJo8jiPfdX9AWBBdWoz').delete();

// const doc = await dbPersonas.doc('8ZJo8jiPfdX9AWBBdWoz').get();

//borrar docs en masa
// const ids = [];
// const snapshot2 = await dbPersonas.get();
// snapshot2.forEach(doc => {
//     ids.push(doc.id)
// })
// const promesas = ids.map(id => dbPersonas.doc(id).delete())

// const resultados = await Promise.allSettled(promesas)

//para obtener todo
// const result = []
// const snapshot = await dbPersonas.get();
// snapshot.forEach( doc => {
//     result.push(asObj(doc))
// })

// para obtener solo los ID de los documentos generados por firestore
// const result = []
// const snapshot = await dbPersonas.get();
// snapshot.forEach( doc => {
//     result.push(doc.id)
// })
// console.log(result);

// console.log(result);

// console.log(asObj(doc));

// console.log(snapshot)
