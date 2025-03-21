const { createServer, request } = require("node:http");
const { URL } = require("node:url");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  try {
    const url = new URL(request.url, `http://${hostname}:${port}`);

    if (request.method == "GET" && url.pathname === "/health-check") {
      response.statusCode = 200;
      const resposta = {
        success: true,
        timestamp: new Date().toISOString(),
      };

      response.end(JSON.stringify(resposta));
    } else {
      response.statusCode = 404;
      response.end("Rota não encontrada");
    }
  } catch (error) {
    response.statusCode = 500;
    response.end(JSON.stringify({ error: "Erro interno do servidor" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/rota1`);
});
