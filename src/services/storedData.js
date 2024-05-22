const { Firestore } = require("@google-cloud/firestore");

async function storedData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
}

module.exports = storedData;
