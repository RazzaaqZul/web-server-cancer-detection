// mengambil env variabel
require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
// load model
const loadModel = require("../services/loadModel");
const ErrorInput = require("../exceptions/ErrorInput");

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  // memyimpan model
  const model = await loadModel();
  // server.app : tmpt menyimpan di Hapi paling aman
  // request.server.app : akses server.app
  server.app.model = model;

  // cek apakah error atau tidak
  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof ErrorInput) {
      const newResponse = h.response({
        status: "fail",
        message: `${response.message}`,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri} `);
})();
