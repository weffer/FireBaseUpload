const admin = require('firebase-admin');
const serviceAccount = require("./key_service_account.json");
const data = require("./productos.json");
const collectionKey = "productos"; //Name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

if (data && typeof data === "object") {
  Object.keys(data).forEach(async docKey => {
    try {
      const docRef = firestore.collection(collectionKey).doc();
      const docId = docRef.id;

      // Agregar el ID del documento como un campo en el JSON
      const newData = { ...data[docKey], id: docId };

      await docRef.set(newData);
      console.log("Document " + docId + " successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  });
}