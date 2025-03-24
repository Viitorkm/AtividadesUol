# API Simples com Módulo HTTP do Node.js

## Descrição

Esta é uma API simples criada utilizando apenas o módulo HTTP do Node.js, sem o uso de frameworks externos. A API oferece quatro endpoints principais para demonstrar operações básicas de um servidor web.

## Tecnologias Utilizadas

- Node.js
- Módulo HTTP nativo do Node.js
- Fetch

## Estrutura do Projeto

O projeto consiste em um único arquivo `server.js` que contém toda a lógica da API.

## Funcionalidades

### 1. Health Check

- **Endpoint**: GET /health-check
- **Descrição**: Retorna o status de saúde da API com um timestamp.
- **Resposta**:
  {
  "success": true,
  "timestamp": "2023-05-20T10:00:00.000Z"
  }

### 2. Verificação de Número Primo

- **Endpoint**: GET /is-prime-number
- **Parâmetro**: number (query parameter)
- **Descrição**: Verifica se o número fornecido é primo.
- **Exemplos de Resposta**:
- Número primo:
  ```
  {
    "isPrime": true
  }
  ```
- Número não primo:
  ```
  {
    "isPrime": false
  }
  ```
- Input inválido:
  ```
  {
    "error": "Invalid input"
  }
  ```

### 3. Contador

- **Endpoint**: POST /count
- **Corpo da Requisição**:
  {
  "incrementBy": 5
  }

- **Descrição**: Incrementa um contador interno e retorna o valor atualizado.
- **Resposta**:
  {
  "counter": 5
  }

### 4. Sugestão de Compra do Bitcoin

- **Endpoint**: GET /stock-insight
- **Parâmetro**: currency (query parameter, opcional, padrão: "usd")
- **Descrição**: Retorna o preço do Bitcoin na moeda especificada e uma sugestão de compra com base no valor atual.
- **Exemplos de Resposta**:
- Para usd:
  ```
  {
    "btc_price": 58000,
    "currency": "usd",
    "suggestion": "Bom momento para compra!"
  }
  ```
- Para brl:
  ```
  {
    "btc_price": 320000,
    "currency": "brl",
    "suggestion": "Preço razoável. Avalie antes de comprar."
  }
  ```
- Input inválido:
  ```
  {
    "error": "Moeda inválida"
  }
  ```

## Como Usar

1. Inicie o servidor:
   node server.js

2. A API estará disponível em `http://localhost:3000`

3. Exemplos de chamadas usando cURL:

- Health Check:

  ```
  curl http://localhost:3000/health-check
  ```

- Verificar Número Primo:

  ```
  curl "http://localhost:3000/is-prime-number?number=7"
  ```

- Incrementar Contador:

  ```
  curl -X POST -H "Content-Type: application/json" -d '{"incrementBy": 5}' http://localhost:3000/count
  ```

- Obter preço e recomendação do bitcoin:
  ```
  curl "http://localhost:3000/stock-insight?currency=usd"
  ```

## Observações

- A API utiliza apenas o módulo HTTP nativo do Node.js, demonstrando a criação de um servidor web sem dependências externas.
