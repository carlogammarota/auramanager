const { MongoClient } = require('mongodb');

// Configuración de las conexiones de las bases de datos
const sourceUri = 'mongodb+srv://admin-web:stuart@cluster0.podle1o.mongodb.net/auramanager';
const targetUri = 'mongodb+srv://admin-web:stuart@cluster0.podle1o.mongodb.net/aztec';

async function cloneDatabase() {
  try {
    // Conexión a las bases de datos
    const sourceClient = new MongoClient(sourceUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const targetClient = new MongoClient(targetUri, { useNewUrlParser: true, useUnifiedTopology: true });

    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db(); // Conectarse a la base de datos fuente
    const targetDb = targetClient.db(); // Conectarse a la base de datos destino

    const collections = await sourceDb.listCollections().toArray(); // Obtener las colecciones de la base de datos fuente

    for (let collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const sourceCollection = sourceDb.collection(collectionName);
      const targetCollection = targetDb.collection(collectionName);

      // Obtener todos los documentos de la colección fuente
      const documents = await sourceCollection.find().toArray();

      // Insertar los documentos en la colección destino
      if (documents.length > 0) {
        await targetCollection.insertMany(documents);
        console.log(`Colección ${collectionName} clonada exitosamente.`);
      } else {
        console.log(`Colección ${collectionName} está vacía, no se clonó.`);
      }
    }

    await sourceClient.close();
    await targetClient.close();
  } catch (error) {
    console.error('Error al clonar la base de datos:', error);
  }
}

cloneDatabase();
