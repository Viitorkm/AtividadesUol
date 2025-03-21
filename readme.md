API Simples com Node.js
Este projeto demonstra a criação de uma API utilizando apenas o módulo HTTP nativo do Node.js, sem depender de frameworks externos como Express. É um excelente exemplo para entender os fundamentos de como as APIs funcionam no ambiente Node.js.

📋 Funcionalidades
A API implementa três endpoints principais:

GET /health-check: Verifica o status do servidor

GET /is-prime-number: Determina se um número é primo

POST /count: Gerencia um contador que pode ser incrementado

🚀 Como Executar
Clone este repositório

Certifique-se de ter o Node.js instalado

Execute o servidor:

bash
node server.js
O servidor estará disponível em http://localhost:3000

📌 Endpoints
Health Check
Verifica se o servidor está funcionando corretamente.

text
GET /health-check
Resposta de sucesso:

json
{
"success": true,
"timestamp": "2025-03-21T12:55:00.000Z"
}
Verificação de Número Primo
Verifica se um número fornecido é primo.

text
GET /is-prime-number?number=7
Resposta para número primo:

json
{
"isPrime": true
}
Resposta para número não primo:

json
{
"isPrime": false
}
Resposta para entrada inválida:

json
{
"error": "Invalid input"
}
Contador
Mantém um contador no servidor que pode ser incrementado.

text
POST /count
Content-Type: application/json

{
"incrementBy": 5
}
Resposta de sucesso:

json
{
"counter": 5
}
Resposta para entrada inválida:

json
{
"error": "Invalid input"
}
🧪 Testando a API
Você pode testar a API usando cURL:

Health Check
bash
curl -X GET http://localhost:3000/health-check
Verificar Número Primo
bash
curl -X GET "http://localhost:3000/is-prime-number?number=7"
Incrementar Contador
bash
curl -X POST http://localhost:3000/count \
 -H "Content-Type: application/json" \
 -d '{"incrementBy": 5}'
💻 Implementação
A API foi implementada usando apenas os módulos nativos do Node.js:

http: Para criar o servidor e gerenciar requisições/respostas

url: Para analisar URLs e parâmetros de consulta

O código utiliza técnicas como:

Manipulação de diferentes métodos HTTP (GET, POST)

Processamento de parâmetros de consulta

Análise de corpo JSON em requisições POST

Formatação adequada de respostas JSON

Gerenciamento de códigos de status HTTP
