const { createServer, request } = require("node:http");
const { URL } = require("node:url");

const hostname = "127.0.0.1";
const port = 3000;
let counter = 0;

async function APIcoinGecko(currency) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
  );
  const data = await response.json();
  const btcPrice = data.bitcoin[currency];
  return btcPrice;
}

const server = createServer(async (request, response) => {
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
        response.end(JSON.stringify({ isPrime: true }));
      } else {
        response.end(JSON.stringify({ isPrime: false }));
      }
    } else if (request.method === "POST" && url.pathname === "/count") {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        try {
          const parsedBody = body.length > 0 ? JSON.parse(body) : {};

          if (
            typeof parsedBody.incrementBy === "number" &&
            parsedBody.incrementBy > 0 &&
            Number.isInteger(parsedBody.incrementBy)
          ) {
            counter += parsedBody.incrementBy;
            response.statusCode = 200;
            response.end(JSON.stringify({ counter: counter }));
          } else {
            throw new Error("Invalid input");
          }
        } catch (error) {
          response.statusCode = 400;
          return response.end(JSON.stringify({ error: "Invalid input" }));
        }
      });
    } else if (request.method === "GET" && url.pathname === "/stock-insight") {
      try {
        let suggestion;
        const currency = (
          url.searchParams.get("currency") ?? "usd"
        ).toLocaleLowerCase();

        if (currency !== "usd" && currency !== "brl") {
          response.statusCode = 400;
          return response.end(JSON.stringify({ error: "Moeda inválida" }));
        }

        const priceBtc = await APIcoinGecko(currency);

        if (currency == "usd") {
          if (priceBtc < 60000) {
            suggestion = "Bom momento para compra!";
          } else if (priceBtc >= 60000 && priceBtc <= 80000) {
            suggestion = "Preço razoável. Avalie antes de comprar";
          } else {
            suggestion = "Bitcoin está caro. Pode ser melhor esperar.";
          }
        } else if (currency == "brl") {
          if (priceBtc < 300000) {
            suggestion = "Bom momento para compra!";
          } else if (priceBtc >= 300000 && priceBtc <= 450000) {
            suggestion = "Preço razoável. Avalie antes de comprar.";
          } else {
            suggestion = "Bitcoin está caro. Pode ser melhor esperar.";
          }
        }

        response.statusCode = 200;
        response.end(
          JSON.stringify({ btc_price: priceBtc, currency, suggestion })
        );
      } catch {
        response.statusCode = 400;
        return response.end(JSON.stringify({ error: "CoinGecko API Error" }));
      }
    } else {
      response.statusCode = 404;
      return response.end(JSON.stringify({ error: "Rote not found" }));
    }
  } catch (error) {
    response.statusCode = 500;
    return response.end(JSON.stringify({ error: "Internal Error" }));
  }
});

server.listen(port, hostname, () => {
  console.log(
    `Iniciado, EndPoint /health-check: http://${hostname}:${port}/health-check`
  );
  console.log(
    `Iniciado, EndPoint /is-prime-number: http://${hostname}:${port}/is-prime-number`
  );
  console.log(
    `Iniciado, EndPoint /stock-insight: http://${hostname}:${port}/stock-insight`
  );
});
