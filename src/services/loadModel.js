/*

Memanfaatkan Library Transflow Js 

*/

const tf = require("@tensorflow/tfjs-node");
async function loadModel() {
  // loadGraphModel() untuk melakukan load model
  // Peneliti mengirimkan Tf.py sbg SavedModel dan konversi Tf.js model (.json & .bin) agar lebih aman
  // API Tf.js tidak selengkap Tf.py
  // Load model dari env variabel
  return tf.loadGraphModel(process.env.MODEL_URL);
}
module.exports = loadModel;
