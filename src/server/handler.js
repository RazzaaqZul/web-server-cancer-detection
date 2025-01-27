const crypto = require("crypto");
const predictClassification = require("../services/inferenceService");
const storedData = require("../services/storedData");
const getHistories = require("../services/historiesData");

async function postPredictHandler(request, h) {
  // menerima gambar yg dikirim
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // membuat struktur data
  const data = {
    id,
    result: label,
    suggestion: label == "Cancer" ? "Segera hubungi dokter" : "None",
    createdAt,
  };

  // Store data di FireStore
  await storedData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

async function getHistoriesHandler(request, h) {
  const histories = await getHistories();
  const response = h.response({
    status: "success",
    data: histories,
  });
  return response;
}
module.exports = { getHistoriesHandler, postPredictHandler };
