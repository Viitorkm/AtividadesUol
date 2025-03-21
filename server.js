const { createServer, request } = require("node:http");
const { URL } = require("node:url");

const hostname = "127.0.0.1";
const port = 3000;
let counter = 0;

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  try {
    const url = new URL(request.url, `http://${hostname}:${port}`);

    if (request.method === "GET" && url.pathname === "/health-check") {
      response.statusCode = 200;
      const resposta = {
        success: true,
        timestamp: new Date().toISOString(),
      };

      response.end(JSON.stringify(resposta));
    } else if (
      request.method === "GET" &&
      url.pathname === "/is-prime-number"
    ) {
      let numero = url.searchParams.get("number");

      let divisores = 0;

      if (numero === null || isNaN(numero)) {
        response.statusCode = 400;
        return response.end(JSON.stringify({ error: "Invalid input" }));
      } else {
        numero = parseInt(numero, 10);
      }

      for (let i = 1; i <= numero; i++) if (numero % i === 0) divisores++;

      if (divisores === 2) {
        return response.end(JSON.stringify({ isPrime: true }));
      } else {
        return response.end(JSON.stringify({ isPrime: false }));
      }
    } else if (response.method === "POST" && url.pathname === "/count") {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        try {
          const parsedBody = body.lenght > 0 ? JSON.parse(body) : {};

          response.statusCode = 200;
          response.end(JSON.stringify({ counter: counter }));
        } catch (error) {
          response.statusCode = 400;
          response.end(JSON.stringify({ error: "Invalid JSON body" }));
        }
      });
    } else {
      response.statusCode = 404;
      response.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
  } catch (error) {
    response.statusCode = 500;
    response.end(JSON.stringify({ error: "Erro interno do servidor" }));
  }
});

server.listen(port, hostname, () => {
  console.log(
    `Iniciado, EndPoint /health-check: http://${hostname}:${port}/health-check`
  );
  console.log(
    `Iniciado, EndPoint /is-prime-number: http://${hostname}:${port}/is-prime-number`
  );
});
